import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { setActiveNote } from "../../store/journal"


export const SideBarItem = ({title, body, id, date, imageUrls =[]}) => {

  const Dispatch = useDispatch();

  const onClickNote = ()=>{
  
    Dispatch(setActiveNote({title, body, id, date, imageUrls}))
  };

    // este hook es para el espacio del título.
    const newTitle = useMemo( () => {
        return title.length > 15
            ? title.substring(0,17) + '...'
            : title; 
    },[title] )
 
    const newBody = useMemo( () => {
      return body.length > 15
          ? body.substring(0,40) + '...'
          : body; 
  },[body] )

  return (
        <ListItem disablePadding>
                <ListItemButton onClick={onClickNote}>
                     <ListItemIcon>
                         <TurnedInNot/>
                  </ListItemIcon>
                    <Grid container>
                         <ListItemText primary={newTitle} />
                        <ListItemText secondary ={newBody} />
                    </Grid>
                  </ListItemButton>
         </ListItem>
    )
}
