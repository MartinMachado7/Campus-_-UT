import { useState } from "react";
import { IconButton, MenuItem, Box, Fade } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

export const Boton = ({ onSeleccion }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleClick = () => setMenuAbierto((prev) => !prev);

  const handleSeleccion = (opcion) => {
    setMenuAbierto(false);
    if (onSeleccion) onSeleccion(opcion);
  };

  return (
    <>
      {/* Contenedor del menú flotante */}
      <Box
        sx={{
          position: "fixed",
          right: 50,
          bottom: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 1,
          zIndex: 2000,
        }}
      >
        {/* Si el menú está abierto, mostramos las opciones con animación */}
        <Fade in={menuAbierto}>
          <Box
            sx={{
              display: menuAbierto ? "flex" : "none",
              flexDirection: "column",
              gap: 1,
              alignItems: "flex-end",
            }}
          >
            <MenuItem
              onClick={() => handleSeleccion("rojo")}
              sx={{
                backgroundColor: "#b10000",
                color: "white",
                borderRadius: 2,
                px: 2,
                py: 1,
                ":hover": { backgroundColor: "#d40000" },
              }}
            >
              📍 Marcar rojo
            </MenuItem>

            <MenuItem
              onClick={() => handleSeleccion("verde")}
              sx={{
                backgroundColor: "#047a04",
                color: "white",
                borderRadius: 2,
                px: 2,
                py: 1,
                ":hover": { backgroundColor: "#06a006" },
              }}
            >
              📍 Marcar verde
            </MenuItem>

            <MenuItem
              onClick={() => handleSeleccion("eliminar")}
              sx={{
                backgroundColor: "#444",
                color: "white",
                borderRadius: 2,
                px: 2,
                py: 1,
                ":hover": { backgroundColor: "#666" },
              }}
            >
              ❌ Eliminar marcador
            </MenuItem>
          </Box>
        </Fade>

        {/* Botón principal (solo visible si el menú está cerrado) */}
        <Fade in={!menuAbierto}>
          <IconButton
            onClick={handleClick}
            size="large"
            sx={{
              color: "white",
              backgroundColor: "error.main",
              ":hover": { backgroundColor: "error.main", opacity: 0.9 },
              zIndex: 2001,
            }}
          >
            <AddOutlined sx={{ fontSize: 30 }} />
          </IconButton>
        </Fade>
      </Box>
    </>
  );
};
