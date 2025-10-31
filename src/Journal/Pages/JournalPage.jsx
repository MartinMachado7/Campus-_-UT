import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IconButton, Typography } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"
import { JournalLayout } from "../Layout/JournalLayout"
import { NothingSelectedViws, NoteView } from "../Viws"
import { starNewNote } from "../../store/journal/thunks"

export const JournalPage = () => {

const Dispatch = useDispatch();
 
const {isSaving, active} = useSelector(state => state.journal)

const onClickNewNote = () =>{

  Dispatch(starNewNote());

}

// const deshabilitarBoton =useMemo(() => isSaving === true, [isSaving]);

  return (
    <JournalLayout>      

      {
      (!!active) 
     
      ? <NoteView /> 
      :<NothingSelectedViws/>
      
      }
      <IconButton
      onClick={ onClickNewNote}
      size="large"
      disabled={isSaving}
      sx={{
        color:"white",
        backgroundColor: "error.main",
        ':hover': {backgroundColor: "error.main", opacity: 0.9 },
        position: 'fixed',
        right: 50,
        bottom: 50,
      }}
      >
      <AddOutlined sx={{ fontSize: 30 }}/>

      </IconButton>

    </JournalLayout>
  )
}
