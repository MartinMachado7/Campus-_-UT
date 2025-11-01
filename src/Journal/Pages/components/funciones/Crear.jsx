// funciones/Crear.js
import L from "leaflet";

export const crearPunto = (map, markersRef, color, latlng, setPuntosCampus) => {
  console.log("🟢 Ejecutando crearPunto con datos:", { color, latlng });

  // Crear un pequeño popup con input y botón
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

  // Crear un popup temporal en la posición donde se hizo clic
  const popup = L.popup()
    .setLatLng(latlng)
    .setContent(popupContent)
    .openOn(map);

  // Esperar que el popup se agregue al DOM
  setTimeout(() => {
    const input = popupContent.querySelector("#nombrePuntoInput");
    const btn = popupContent.querySelector("#guardarPuntoBtn");

    if (!input || !btn) return;

    btn.addEventListener("click", () => {
      const nombre = input.value.trim();
      if (!nombre) {
        alert("⚠️ Ingrese un nombre para el punto.");
        return;
      }

      // Crear el ícono según color
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

      // Crear marcador y agregarlo al mapa
      const marker = L.marker(latlng, { icon })
        .addTo(map)
        .bindPopup(`<b>${nombre}</b>`);

      const nuevoPunto = { marker, nombre, lat: latlng.lat, lng: latlng.lng, color: colorFinal };
      markersRef.current = [...(markersRef.current || []), nuevoPunto];

      if (typeof setPuntosCampus === "function") {
        setPuntosCampus((prev) => [...prev, nuevoPunto]);
      }

      console.log(`✅ Punto creado: "${nombre}" (${colorFinal}) en`, latlng);
      map.closePopup(); // cerrar el popup
    });
  }, 100);
};
