import { LogoutOutlined} from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { startLogout } from "../../store/auth";
import { MenuOutlined } from "@mui/icons-material";


export const NavBar = ({DrawerWidth, handleDrawerOpen}) => {

    const dispatch =useDispatch();

    const onLogout =() => {
        dispatch(startLogout());
    };
  return (
    <AppBar
    // position="fixed"
    // sx={{
    //     width: {sm: `calc(100% - ${ DrawerWidth}px)`},
    //     ml: {sm: `${DrawerWidth }px`}
    // }}
    >
        <Toolbar>
          
        <IconButton
            onClick={handleDrawerOpen}
            >
            <MenuOutlined />
          </IconButton>
            <Grid container direction={'row'} justifyContent='space-between' alignItems='center'>
                    <Typography variant="h6" noWrap component='div'>JournalApp</Typography>
                            
                    <IconButton 
                    color="error"
                    onClick={onLogout}>
                        <LogoutOutlined/>
                    </IconButton>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}
