import { Link } from "react-router-dom";
import LogoSvg from "../../assets/logo_png.png";


const Sidebar = () => {
  return (
    <div className="bg-purple-500 text-white h-screen w-48 fixed left-0 top-0 p-4 ">
      <img src={LogoSvg} alt="Logo" className="w-50 h-45 mx-auto" />
      <div className="my-2">
        <Link to="/dashboard" className="block p-2 hover:bg-purple-400 transition duration-300 rounded-md">Home</Link>
      </div>
      <div className="my-2">
        <Link to="/order" className="block p-2 hover:bg-purple-400 transition duration-300 rounded-md">Pedidos</Link>
      </div>
      <div className="my-2">
        <Link to="/stock" className="block p-2 hover:bg-purple-400 transition duration-300 rounded-md">Estoque</Link>
      </div><div className="my-2">
        <Link to="/customer" className="block p-2 hover:bg-purple-400 transition duration-300 rounded-md">Clientes</Link>
      </div>
      <div id="oi" className="absolute bottom-0 right-0 my-2 mx-4">
      <Link to="/" className="block p-2 hover:bg-purple-400 transition duration-300 rounded-md">Sair</Link>
      </div>
    </div>
  );
};

export default Sidebar;