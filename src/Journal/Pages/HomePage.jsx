import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { MapaInteractivo } from "./components/MapaInteractivo";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Campus UT</h1>

      {/* Aquí va el nuevo mapa interactivo */}
      <div className="map-container">
        <MapaInteractivo />
      </div>

      <Link to="/auth/register" className="btn">
        Ir al Registro
      </Link>
    </div>
  );
};
