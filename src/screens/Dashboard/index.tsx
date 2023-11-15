import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <h2 className="mb-5 text-3xl font-semibold text-gray-700">Seja bem-vindo a Tela Principal do farma facil!</h2>

      <div className="my-6">
        <Link
          to="/order"
          className="inline-flex rounded-md bg-gray-100 p-4 text-base font-semibold hover:bg-gray-200 md:text-lg">
          Ir para Pedidos
        </Link>
      </div>
      <div className="my-6">
      <Link
        to="/stock"
        className="inline-flex rounded-md bg-gray-100 p-4 text-base font-semibold hover:bg-gray-200 md:text-lg">
          Ir para estoque
        </Link>
      </div>
    </>
  );
}
