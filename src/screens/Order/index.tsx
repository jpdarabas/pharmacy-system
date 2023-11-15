import { useState } from 'react';
import { Button, TextField, Paper, Typography, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './index.css';
import LogoSvg from "../../assets/logo.png";

export default function Order() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginInButton = () => {
    if (username && password) {
      // Simulate successful authentication
      navigate('/');
    } else {
      alert('Please fill in the username and password fields.');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <img src={LogoSvg} alt="Logo" /> {/* Display the logo */}
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
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
      </Paper>
    </Grid>
  );
}
