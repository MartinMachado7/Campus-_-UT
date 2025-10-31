import { Grid, Box } from "@mui/material";
import { MapaInteractivo } from "../Pages/components/MapaInteractivo";

export const NothingSelectedViws = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100vh",
        backgroundColor: "#222",
        p: { xs: 1, sm: 2 },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          height: { xs: "85vh", md: "90vh" },
          border: "3px solid red",
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MapaInteractivo />
      </Box>
    </Grid>
  );
};
