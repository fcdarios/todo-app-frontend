import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
   return (
      <Container className='home-container' maxWidth="md">
         <Typography variant="h1" align="center" fontWeight={400} gutterBottom>
            ¡Bienvenido a app de Tareas!
         </Typography>
         <Typography variant="body1" fontWeight={400} align="center" gutterBottom>
            Esta es una aplicación frontend para gestionar tus tareas diarias creada con React, Redux Toolkit, Typescript y Material UI.
         </Typography>
         <Box textAlign="center" marginTop={5} >
            <Button style={{'background': '#8992eb', 'color': 'black', 'padding': '10px 50px'}} className='button-primary' component={Link} to="/login">
               <Typography variant="body1" align="center" fontWeight={600} >¡Iniciar!</Typography>
            </Button>
         </Box>
      </Container>
   )
}

export default LandingPage