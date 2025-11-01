// funciones/Crear.js
// funciones/Crear.js
import L from "leaflet";
import { collection, addDoc } from "firebase/firestore";
import { FirebaseAuth, FirebaseDB } from "../../../../firebase/config";
 // ajusta la ruta según tu estructura
export const crearPunto = (map, markersRef, color, latlng, setPuntosCampus) => {
  console.log("🟢 Ejecutando crearPunto con datos:", { color, latlng });

  const popupContent = document.createElement("div");
  popupContent.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:6px; font-family:sans-serif;">
      <label>Nombre del punto:</label>
      <input id="nombrePuntoInput" type="text" placeholder="Ej: Bloque A"
        style="padding:4px; border:1px solid #ccc; border-radius:4px;">
      <button id="guardarPuntoBtn"
        style="padding:4px; background-color:${color.toLowerCase() === "rojo" ? "#d33" : "#3b7"};
               color:white; border:none; border-radius:4px; cursor:pointer;">
        Guardar
      </button>
    </div>
  `;

  const popup = L.popup()
    .setLatLng(latlng)
    .setContent(popupContent)
    .openOn(map);

  setTimeout(() => {
    const input = popupContent.querySelector("#nombrePuntoInput");
    const btn = popupContent.querySelector("#guardarPuntoBtn");

    if (!input || !btn) return;

    btn.addEventListener("click", async () => {
      const nombre = input.value.trim();
      if (!nombre) {
        alert("⚠️ Ingrese un nombre para el punto.");
        return;
      }

      const colorFinal = color.toLowerCase();
      const iconUrl =
        colorFinal === "rojo"
          ? "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png"
          : "https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png";

      const icon = L.icon({
        iconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker(latlng, { icon })
        .addTo(map)
        .bindPopup(`<b>${nombre}</b>`);

      const nuevoPunto = {
        marker,
        nombre,
        lat: latlng.lat,
        lng: latlng.lng,
        color: colorFinal,
      };

      markersRef.current = [...(markersRef.current || []), nuevoPunto];
      if (typeof setPuntosCampus === "function") {
        setPuntosCampus((prev) => [...prev, nuevoPunto]);
      }

      // 🟡 Guardar el punto en Firestore
      try {
        const user = FirebaseAuth.currentUser;
        if (user) {
          await addDoc(collection(FirebaseDB, "markers"), {
            nombre,
            lat: latlng.lat,
            lng: latlng.lng,
            color: colorFinal,
            userId: user.uid,
            createdAt: new Date(),
          });
          console.log("✅ Punto guardado en Firestore");
        } else {
          console.warn("⚠️ Usuario no autenticado. No se guardó en Firestore.");
        }
      } catch (error) {
        console.error("❌ Error guardando en Firestore:", error);
      }

      map.closePopup();
    });
  }, 100);
};
