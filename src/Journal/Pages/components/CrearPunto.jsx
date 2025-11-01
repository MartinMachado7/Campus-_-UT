import React, { useEffect, useRef } from "react";
import L from "leaflet";

export const CrearPuntos = ({ map, markersRef, accion }) => {
  const accionRef = useRef(accion);

  // 🔁 Mantiene el valor actualizado SIEMPRE
  useEffect(() => {
    accionRef.current = accion;
  }, [accion]);

  useEffect(() => {
    if (!map) return;

    const umbral = 30;

    const handleDblClick = (e) => {
      // ⚠️ Siempre leer la acción actual DESDE LA REF
      const accionActual = accionRef.current;
      const { latlng } = e;
      const lat = Number(latlng.lat.toFixed(2));
      const lng = Number(latlng.lng.toFixed(2));

      // Prueba: ver qué valor REAL tiene
      console.log("acción actual dentro del evento:", accionActual);

      if (accionActual === "Verde" || accionActual === "Rojo") {
        console.log(`Acción: ${accionActual} | Coordenadas: lat=${lat}, lng=${lng}`);
        return;
      }

      if (accionActual === "eliminar") {
        const arr = markersRef?.current || [];

        let encontrado = null;
        let distanciaMin = Infinity;

        for (const item of arr) {
          const marker = item?.marker ? item.marker : item;
          if (!marker?.getLatLng) continue;

          const dist = map.distance(latlng, marker.getLatLng());
          if (dist < distanciaMin) {
            distanciaMin = dist;
            encontrado = item;
          }
        }
        if (encontrado && distanciaMin <= umbral) {
          const nombre =
            encontrado?.nombre ??
            (encontrado?.marker?.getPopup?.()?.getContent?.() ??
              "Marcador sin nombre");

          console.log(
            `Eliminar: Doble clic sobre marcador EXISTENTE -> "${nombre}". Distancia: ${Math.round(
              distanciaMin
            )}`
          );
        } else {
          console.log(
            "Eliminar: Doble clic sobre zona VACÍA (no hay marcador cerca)."
          );
        }
        return;
      }

      console.log(
        `Doble clic en lat=${lat}, lng=${lng} (acción actual: ${accionActual})`
      );
    };

    // ⚠️ Importante: registrar solo una vez
    map.on("dblclick", handleDblClick);
    return () => map.off("dblclick", handleDblClick);
  }, [map, markersRef]); // No depende de `accion`

  return null;
};
