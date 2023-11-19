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
    <div style={loginStyle}>
      <img src={LogoSvg} alt="Logo" />

      <TextField
        type="text"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="custom-textfield"
      />

      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="custom-textfield"
      />

      <Button variant="contained" color="primary" onClick={handleLoginInButton}>
        Login
      </Button>
    </div>
  );
}
