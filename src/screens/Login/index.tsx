import { useState } from 'react';
import { Button, TextField, Typography, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoSvg from '../../assets/logo.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginInButton = () => {
    if (username && password) {
      // Simulate successful authentication
      // Navegar para a rota /dashboard após o login bem-sucedido
      navigate('/dashboard');
    } else {
      alert('Por favor, preencha os campos de usuário e senha.');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" className="h-screen">
      <div className="bg-purple-500 p-8 rounded-lg shadow-md">
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <img src={LogoSvg} alt="Logo" className="w-32 h-32" />
          </Grid>
          <Grid item>
            <Typography variant="h5">Login</Typography>
          </Grid>
          <Grid item>
            <TextField
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="custom-textfield"
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="custom-textfield"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleLoginInButton}>
              Login
            </Button>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}
