import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { puntosCampus as puntosIniciales } from "../../data/PuntosCampus";
import { CrearPuntos } from "./CrearPunto";

import { collection, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth, FirebaseDB } from "../../../firebase/config";

export const MapaInteractivo = ({ accion, colorSeleccionado = "rojo" }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [busqueda, setBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [puntosCampus, setPuntosCampus] = useState(puntosIniciales);

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
    const bounds = [
      [0, 0],
      [h, w],
    ];

    L.imageOverlay("/CampusUt.png", bounds).addTo(map);
    map.fitBounds(bounds);
    mapRef.current = map;

    // 🟢 1. Cargar marcadores del campus por defecto
    puntosIniciales.forEach((p) => {
      const marker = L.marker([p.y, p.x])
        .addTo(map)
        .bindPopup(`<b>${p.nombre}</b>`);
      markersRef.current.push({
        marker,
        nombre: p.nombre.replace(/<br>/gi, " ").toLowerCase(),
      });
    });

    // 🟡 2. Cargar los marcadores del usuario autenticado desde Firestore
    const unsubscribeAuth = onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) {
        const q = query(collection(FirebaseDB, "markers"), where("userId", "==", user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          // eliminar los antiguos marcadores del usuario del mapa
          markersRef.current.forEach((m) => {
            if (m.userMarker) map.removeLayer(m.marker);
          });

          const userMarkers = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const icon = L.icon({
              iconUrl:
                data.color === "rojo"
                  ? "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png"
                  : "https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png",
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32],
            });

            const marker = L.marker([data.lat, data.lng], { icon })
              .addTo(map)
              .bindPopup(`<b>${data.nombre}</b>`);

            return { marker, nombre: data.nombre, userMarker: true };
          });

          // combinar marcadores por defecto y del usuario
          markersRef.current = [
            ...markersRef.current.filter((m) => !m.userMarker),
            ...userMarkers,
          ];
        });

        return () => unsubscribe();
      }
    });

    return () => {
      unsubscribeAuth();
      map.remove();
    };
  }, []);

  // --- Lógica de búsqueda (igual que la tuya) ---
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
      <div className="search-bar-floating">
        <input
          type="text"
          placeholder="Buscar bloque o edificio..."
          value={busqueda}
          onChange={handleInputChange}
        />
        <button onClick={() => handleBuscar()}>Buscar</button>

        {sugerencias.length > 0 && (
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
        )}
      </div>

      <div style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
        <div id="map" className="map-container"></div>

        {mapRef.current && (
          <CrearPuntos
            map={mapRef.current}
            markersRef={markersRef}
            accion={accion}
            colorSeleccionado={colorSeleccionado}
            setPuntosCampus={setPuntosCampus}
          />
        )}
      </div>
    </div>
  );
};
