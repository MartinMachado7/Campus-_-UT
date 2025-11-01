import React, { useEffect, useRef } from "react";
import { crearPunto } from "./funciones/Crear";
import { eliminarPunto } from "./funciones/Eliminar";

export const CrearPuntos = ({ map, markersRef, accion, setPuntosCampus }) => {
  const accionRef = useRef(accion);

  // 🔁 Mantiene el valor actualizado siempre
  useEffect(() => {
    accionRef.current = accion;
  }, [accion]);

  useEffect(() => {
    if (!map) return;

    const handleDblClick = (e) => {
      const { latlng } = e;
      const accionActual = accionRef.current;

      console.log(`📍 Doble clic detectado | Acción actual: ${accionActual}`);

      if (accionActual === "rojo" || accionActual === "verde") {
        crearPunto(map, markersRef, accionActual, latlng, setPuntosCampus);
        return;
      }

      if (accionActual === "eliminar") {
        eliminarPunto(map, markersRef, latlng, setPuntosCampus);
        return;
      }

      console.log(
        `⚠️ Doble clic sin acción válida (acción: ${accionActual})`
      );
    };

    map.on("dblclick", handleDblClick);
    return () => map.off("dblclick", handleDblClick);
  }, [map, markersRef]);

  return null;
};
