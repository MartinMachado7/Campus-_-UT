import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";


export const PurpleTheme = createTheme({
    palette:{
        primary:{
            main:'#424242'
        },
        secondary:{
            main:'#1a237e'
        },
        error:{
            main:red.A400
        }
    }
}) 