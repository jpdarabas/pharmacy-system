import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoSvg from '../../assets/logo.png';

// Importe a imagem de fundo
import backgroundImage from '../../assets/farma_fundo.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginInButton = () => {
    if (username && password) {
      // Navegar para a rota /dashboard após o login bem-sucedido
      navigate('/dashboard');
    } else {
      alert('Por favor, preencha os campos de usuário e senha.');
    }
  };

  const loginStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '97vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3px',
  };

  return (
    <Grid container justifyContent="center" alignItems="center" className="h-screen bg-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <img src={LogoSvg} alt="Logo" className="w-42 h-42" />
          </Grid>
          <Grid item>
            <Typography variant="h5">Login</Typography>
          </Grid>
          <Grid item>
            <TextField
              type="text"
              label="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="custom-textfield "
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="custom-textfield"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleLoginInButton}>
              Entrar
            </Button>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              Esqueceu sua senha?
            </Link>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}
