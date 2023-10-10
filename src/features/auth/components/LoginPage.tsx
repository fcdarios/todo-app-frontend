import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Box, Button, Card, Checkbox, Container, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'

import '../../../styles/authPage.css';
import { authLogin } from '../authSlice';
import { useAppDispatch } from '../../../app/hooks';


const LoginPage = () => {

   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   
   // const location  = useLocation();
   // const parameters = location.state;
   // let email: string | null = null;
   // if ( parameters ) {
   //    email = parameters.email;
   // }
   
   const [showPassword, setShowPassword] = useState(false);
   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
   };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const email:string = ''+data.get('email');
      const password:string = ''+data.get('password');

      const result = await dispatch( authLogin({ email, password}));
      if ( result.payload ) {
         navigate('/');
      }
   };
  
  
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
                  Sign in
               </Typography>
               <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                     margin="normal"
                     type="email"
                     required={true}
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     autoFocus
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
                     label="Remember me"
                  />
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Sign In
                  </Button>
                  <Grid container>
                     <Grid item xs>
                        <Link to='/'>
                              {"Home"}
                        </Link>
                     </Grid>
                     <Grid item>
                        <Link to='/register'>
                           {"Don't have an account? Sign Up"}
                        </Link>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </Card>
      </Container>
   )
}

export default LoginPage