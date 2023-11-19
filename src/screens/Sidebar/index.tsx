import { Link } from "react-router-dom";
import LogoSvg from "../../assets/logo.png";


const Sidebar = () => {
  return (
    <div className="bg-purple-500 text-white h-screen w-48 fixed left-0 top-0 p-4 ">
      <img src={LogoSvg} alt="Logo" className="w-42 h-42 mx-auto" />
      <h2 className="text-center text-lg font-semibold mb-4">Bem-vindo ao Farma Fácil!</h2>
      <div className="my-2">
        <Link to="/dashboard" className="block p-2 hover:bg-purple-400 transition duration-300 rounded-md">Ir para Tela Principal</Link>
      </div>
      <div className="my-2">
        <Link to="/order" className="block p-2 hover:bg-purple-400 transition duration-300 rounded-md">Ir para Pedidos</Link>
      </div>
      <div className="my-2">
        <Link to="/stock" className="block p-2 hover:bg-purple-400 transition duration-300 rounded-md">Ir para Estoque</Link>
      </div>
      <div id="oi" className="absolute bottom-0 right-0 my-2 mx-4">
      <Link to="/" className="block p-2 hover:bg-purple-400 transition duration-300 rounded-md">Sair</Link>
      </div>
    </div>
  );
};

export default Sidebar;