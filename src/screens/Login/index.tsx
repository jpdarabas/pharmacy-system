   import React, { useState } from 'react';
   import { Button, TextField, Paper, Typography, Grid, Link } from '@mui/material';
   import { useNavigate } from 'react-router-dom';
   import './index.css';
   
   export default function Login() {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const navigate = useNavigate();
   
     const handleLoginInButton = () => {
       if (username && password) {
         // Simular autenticação bem-sucedida
         navigate('/');
       } else {
         alert('Por favor, preencha os campos de nome de usuário e senha.');
       }
     };
   
     return (
       <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
         <Paper elevation={3} style={{ padding: '20px' }}>
           <Grid container spacing={2} direction="column" alignItems="center">
             <Grid item>
             </Grid>
             <Grid item>
               <Typography variant="h5">Login</Typography>
             </Grid>
             <Grid item>
               <TextField
                 type="text"
                 label="Nome de Usuário"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
               />
             </Grid>
             <Grid item>
               <TextField
                 type="password"
                 label="Senha"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
               />
             </Grid>
             <Grid item>
               <Button variant="contained" color="primary" onClick={handleLoginInButton}>
                 Entrar
               </Button>
             </Grid>
             <Grid item>
               <Link href="#" variant="body2">
                 Esqueceu a senha?
               </Link>
             </Grid>
           </Grid>
         </Paper>
       </Grid>
     );
   }