import { useSelector } from "react-redux"
import { Box, Divider, Drawer, IconButton, List, Toolbar, Typography } from "@mui/material"
import { SideBarItem } from "./";
import ReadMoreIcon from '@mui/icons-material/ReadMore';


export const SsideBar= ({DrawerWidth, handleDrawerClose, open}) => {

    const {displayName} =useSelector(state => state.auth);
    const {notes} =useSelector(state => state.journal);

  return (
    <Box
        component='nav'
        // sx={{width: {sm: DrawerWidth}, flexShrink:{sm:0}}}
       >
        <Drawer
           sx={{
              width: DrawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: DrawerWidth,
                boxSizing: 'border-box',
              },
            }}
              variant="temporary"
              anchor="left"
              open={open}
              
              onClick={handleDrawerClose}
            >
            <Toolbar>
                 <Typography variant="h6" noWrap component='div'>
                    {displayName}
                 </Typography>
                  <IconButton onClick={handleDrawerClose}>
                    <ReadMoreIcon/>
                </IconButton>
            </Toolbar>
           <Divider />
                <List>
                    {
                        notes.map( note => (
                            <SideBarItem key={ note.id } { ...note } />
                        ))
                    }
                </List>
        </Drawer>
    </Box>
  )
}
