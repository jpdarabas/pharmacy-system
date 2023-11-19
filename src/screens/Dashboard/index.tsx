import backgroundImage from '../../assets/farma_fundo.png'; 

const Dashboard = () => {
  const styles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black', 
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
  };

  return (
    <div style={styles}>
      <div className="text-4xl">
        Bem-vindo ao Farma Fácil!
      </div>
    </div>
  );
};

export default Dashboard;
