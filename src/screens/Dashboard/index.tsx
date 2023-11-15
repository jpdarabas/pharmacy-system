import { Link } from "react-router-dom";
import LogoSvg from "../../assets/logo.png";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen" >
      <div className="text-center mb-8">
        <img src={LogoSvg} alt="Logo" className="w-32 h-32 mx-auto" />
      </div>
      <h2>
        Bem-vindo ao Farma Fácil!
      </h2>
      <div className="my-6">
        <Link
          to="/order"
        >
          Ir para Pedidos
        </Link>
      </div>
      <div className="my-6">
        <Link
          to="/stock"
        >
          Ir para Estoque
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
