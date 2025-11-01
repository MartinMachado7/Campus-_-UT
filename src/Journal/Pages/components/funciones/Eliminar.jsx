import L from "leaflet";

export const eliminarPunto = (map, markersRef, latlng, setPuntosCampus) => {
  if (!map || !markersRef?.current) return;

  const arr = markersRef.current;
  const umbral = 30; // distancia máxima en píxeles para considerar que se hizo clic sobre un marcador
  let encontrado = null;
  let distanciaMin = Infinity;

  // 🔹 Buscar el marcador más cercano
  for (const item of arr) {
    const marker = item.marker ?? item;
    if (!marker?.getLatLng) continue;

    const dist = map.distance(latlng, marker.getLatLng());
    if (dist < distanciaMin) {
      distanciaMin = dist;
      encontrado = item;
    }
  }

  // 🔹 Si no se encontró marcador cerca
  if (!encontrado || distanciaMin > umbral) {
    alert("⚠️ No hay ningún marcador cerca del punto seleccionado.");
    return;
  }

  const nombre =
    encontrado.nombre ??
    (encontrado.marker?.getPopup?.()?.getContent?.() ?? "Marcador sin nombre");

  // 🔹 Confirmar eliminación
  const confirmar = window.confirm(
    `¿Estás seguro de eliminar el marcador "${nombre}"?`
  );

  if (!confirmar) {
    console.log("❎ Eliminación cancelada por el usuario.");
    return;
  }

  // 🔹 Eliminar del mapa
  map.removeLayer(encontrado.marker ?? encontrado);

  // 🔹 Eliminar del arreglo y del estado global
  markersRef.current = arr.filter((item) => item !== encontrado);
  setPuntosCampus((prev) => prev.filter((p) => p !== encontrado));

  console.log(`🗑️ Marcador "${nombre}" eliminado correctamente.`);
  alert(`✅ Marcador "${nombre}" eliminado correctamente.`);
};
