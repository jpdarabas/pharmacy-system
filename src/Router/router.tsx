import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "../screens/Login";

// Resto da configuração do roteamento
// Importe a página de login

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/login" element={<Login />} />
        </Route>)
)
export default Router;
