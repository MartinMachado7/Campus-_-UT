import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IconButton, Typography } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"
import { JournalLayout } from "../Layout/JournalLayout"
import { Boton, NothingSelectedViws } from "../Viws"
import { starNewNote } from "../../store/journal/thunks"
import { CrearPuntos } from "./components/CrearPunto"

export const JournalPage = () => {

const Dispatch = useDispatch();
 
const [accion, setAccion] = useState(null);


  const handleAccion = (accionSeleccionada) => {
    setAccion(accionSeleccionada)
  };
// const deshabilitarBoton =useMemo(() => isSaving === true, [isSaving]);

  return (
    <JournalLayout>       
      
      <Boton onSeleccion={handleAccion} />
      <NothingSelectedViws accion={accion}/>
    </JournalLayout>
  )
}
