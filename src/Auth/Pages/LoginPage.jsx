import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as Routerlink  } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography,ThemeProvider } from "@mui/material"
import Google from "@mui/icons-material/Google";

import { AuthLayout } from "../Layout/AuthLayout";

import { UseForm } from "../../Hooks";
import { startGoogleSingIn, startLoginWithEmailPassword } from "../../store/auth";
import { theme } from "../componentes/Color";
  const formDate = {
  email:'',
  password: ''
  }

export const LoginPage = () => {
 
  const {status, errorMessage} = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const {email, password, onInputChange,} = UseForm(formDate);

  const isAuthenticating = useMemo(()=> status === 'checkimg',[status]);

  const onSubmit =(event) =>{
    event.preventDefault();

  // console.log( email, password);
    dispatch(startLoginWithEmailPassword({email, password}));
  }
  const onGoogleSingIn = ()=>{
    dispatch(startGoogleSingIn());
  }

  return (
    <ThemeProvider theme={theme}>
    <AuthLayout title="login">
      
        <form 
       aria-label="sumit-form"
        onSubmit={onSubmit}>
        <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField
              label ='CORREO'
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              />
            </Grid>

              <Grid item xs={12} sx={{mt: 2}}>
                <TextField
                label ='CONTRASEÑA'
                type="password"
                placeholder="contraseña"
                fullWidth
                name="password"
                inputProps={{
                  'data-testid': 'password'
                }}
                value={password}
                onChange={onInputChange}
                />
              </Grid>

              <Grid container
                display={!!errorMessage ? '': 'none'}
                sx={{mt:1}} >
                <Grid
                item 
                xs={ 12 }
                >
                  <Alert severity="error">{errorMessage}</Alert>
                </Grid>
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1}}>
                <Grid item xs={ 12 } sm={6}>
                  <Button 
                  disabled={isAuthenticating}
                  type='submit' 
                  variant='contained' 
                  fullWidth
                  >
                    login
                  </Button>
                </Grid>

                <Grid item xs={ 12 } sm={6}>
                  <Button 
                  disabled={isAuthenticating}
                  variant='contained' 
                  aria-label="google-btn"
                  fullWidth
                  onClick={onGoogleSingIn}>
                    <Google/>
                    <Typography sx={{ml:1}}>Google</Typography>
                  </Button>
                </Grid>
               </Grid>

                <Grid container direction='row' justifyContent='end'>
                  <Link component={ Routerlink } color ='inherit' to='/Auth/Registerpages'>
                  crear una cuenta
                  </Link>
                </Grid>

          </Grid>
        </form>

    </AuthLayout>
</ThemeProvider>

  )
}
 