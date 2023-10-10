import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Box, Button, Card, Checkbox, Container, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'

import '../../../styles/authPage.css';
import { authRegister } from '../authSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';


const RegisterPage = () => {

   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const [showPassword, setShowPassword] = useState(false);
   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
   };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const name:string = ''+data.get('name');
      const email:string = ''+data.get('email');
      const password:string = ''+data.get('password');

      const result = await dispatch( authRegister({ name, email, password}));
      if ( result.payload ) {
         navigate(`/login`, { state:{ email } });
      }
   };

   const errorMessage = useAppSelector( state => state.auth.errorMessage );
  
  
   return (
      <Container className='auth-container' component="main" maxWidth="sm">
         <Card>
            <Box
               sx={{
                  marginY: 8,
                  paddingX: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: 'lightsteelblue',width: 56, height: 56 }}>
                  <AccountCircleIcon fontSize="large" />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Registrar cuenta
               </Typography>
               <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
               <TextField
                     margin="normal"
                     type="text"
                     required={true}
                     fullWidth
                     id="name"
                     label="Name"
                     name="name"
                     autoComplete="name"
                     autoFocus
                  />
                  <TextField
                     margin="normal"
                     type="email"
                     required={true}
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                  />
                  <FormControl sx={{ width: '100%' }} variant="outlined">
                     <InputLabel htmlFor="password">Password</InputLabel>
                     <OutlinedInput
                        id="password"
                        required={true}
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                              <InputAdornment position="end">
                                 <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                 >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                 </IconButton>
                              </InputAdornment>
                           }
                     />
                  </FormControl>
                  <FormControlLabel
                     control={<Checkbox value="remember" color="primary" />}
                     label="Recordarme"
                  />
                  <div className={errorMessage ? 'divErrorMessage divErrorMessageColor' : 'divErrorMessage'} >
                     { errorMessage }
                  </div>
                 
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 1, mb: 2 }}
                  >
                     Registrar
                  </Button>
                  <Grid container>
                     <Grid item xs>
                        <Link to='/'>
                              {"Home"}
                        </Link>
                     </Grid>
                     <Grid item>
                        <Link to='/login'>
                           {"Ya tienes una cuenta?, Inicia sesión"}
                        </Link>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </Card>
      </Container>
   )
}

export default RegisterPage