import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IconButton, Typography } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"
import { JournalLayout } from "../Layout/JournalLayout"
import { Boton, NothingSelectedViws } from "../Viws"
import { starNewNote } from "../../store/journal/thunks"

export const JournalPage = () => {

const Dispatch = useDispatch();
 
const {isSaving, active} = useSelector(state => state.journal)


  const handleAccion = (accion) => {
    console.log("Acción seleccionada:", accion);
    // 🔥 Aquí luego vas a manejar los modos del mapa (agregar/eliminar)
  };
// const deshabilitarBoton =useMemo(() => isSaving === true, [isSaving]);

  return (
    <JournalLayout>       
      
      <Boton onSeleccion={handleAccion} />
      <NothingSelectedViws/>
    </JournalLayout>
  )
}
