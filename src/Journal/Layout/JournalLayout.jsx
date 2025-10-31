import { useState } from "react";
import { Box, Drawer, Toolbar, useTheme } from "@mui/material"
import { NavBar, SsideBar } from "../componets";



export const JournalLayout = ({children}) => {
  const DrawerWidth = 240;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  let handleDrawerOpen = () => {
    setOpen(true) ;
  };
  let handleDrawerClose = () => {
    setOpen();
    // console.log('hi word')
  };
  

    return (
      <Box sx={{display: 'flex'} }>
       
        <NavBar 
        DrawerWidth={DrawerWidth}
        handleDrawerOpen={handleDrawerOpen}
        open={open}

        position="fixed"
        sx={{
          width: {sm: `calc(100% - ${ DrawerWidth}px)`},
          ml: {sm: `${DrawerWidth }px`}
          }}
         >
        </NavBar>            
        {/* <Drawer
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
        ></Drawer> */}
            <SsideBar 
            DrawerWidth={DrawerWidth}
            handleDrawerClose={handleDrawerClose}
            open={open}
            />


    
        <Box 
        open={open}
        component={'main'}
        sx={{ flexGrow: 1, p: 3 }}
        // onClick={handleDrawerClose}
        >
            <Toolbar/>
            {children}
        </Box>
    </Box>
)
}
