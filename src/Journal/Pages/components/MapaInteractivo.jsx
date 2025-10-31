import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { puntosCampus } from "../../data/puntosCampus";

export const MapaInteractivo = () => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [busqueda, setBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);

  useEffect(() => {
    const existingMap = L.DomUtil.get("map");
    if (existingMap) existingMap._leaflet_id = null;

    const map = L.map("map", {
      crs: L.CRS.Simple,
      minZoom: -3,
      maxZoom: 2,
    });

    const w = 1500;
    const h = 1000;
    const bounds = [[0, 0], [h, w]];

    L.imageOverlay("/CampusUt.png", bounds).addTo(map);
    map.fitBounds(bounds);
    mapRef.current = map;

    // Agregar marcadores
    puntosCampus.forEach((p) => {
      const marker = L.marker([p.y, p.x])
        .addTo(map)
        .bindPopup(`<b>${p.nombre}</b>`);
      markersRef.current.push({
        marker,
        nombre: p.nombre.replace(/<br>/gi, " ").toLowerCase(),
      });
    });

    return () => map.remove();
  }, []);

  // Función de búsqueda
  const handleBuscar = (nombre) => {
    const texto = (nombre || busqueda).trim().toLowerCase();
    if (!texto) return;

    const puntoEncontrado = markersRef.current.find((m) =>
      m.nombre.includes(texto)
    );

    if (puntoEncontrado) {
      const { marker } = puntoEncontrado;
      mapRef.current.setView(marker.getLatLng(), 2);
      marker.openPopup();
      setSugerencias([]);
      setBusqueda("");
    } else {
      alert("Ubicación no encontrada");
    }
  };

  // Manejar cambios del input
  const handleInputChange = (e) => {
    const texto = e.target.value;
    setBusqueda(texto);

    if (texto.length > 0) {
      const sugerenciasFiltradas = puntosCampus
        .map((p) => p.nombre.replace(/<br>/gi, " "))
        .filter((n) => n.toLowerCase().includes(texto.toLowerCase()))
        .slice(0, 5);

      setSugerencias(sugerenciasFiltradas);
    } else {
      setSugerencias([]);
    }
  };

  return (
    <div className="map-wrapper">
      {/*  Barra de búsqueda flotante */}
      <div className="search-bar-floating">
        <input
          type="text"
          placeholder="Buscar bloque o edificio..."
          value={busqueda}
          onChange={handleInputChange}
        />
        <button onClick={() => handleBuscar()}>Buscar</button>

       { sugerencias.length > 0 && (
            <div className="sugerencias-dropdown">
                {sugerencias.map((s, i) => (
                <div
                    key={i}
                    className="sugerencia-item"
                    onClick={() => handleBuscar(s)}
                >
                    {s}
                </div>
                ))}
         </div>
            ) }
      </div>

      {/*  Contenedor del mapa */}
      <div id="map" className="map-container"></div>
    </div>
  );
};
