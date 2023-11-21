import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "../screens/Login";
import Pedidos from "../screens/Pedidos"

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Login />} />
            <Route path="/pedidos" element={<Pedidos />} />
      </Route>
    )
)

export default Router;
