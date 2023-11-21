import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import Order from "../screens/Order";
import Stock from "../screens/Stock";
import Sidebar from "../screens/Sidebar";

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={
            <div>
                <Sidebar/>
                <Dashboard />
            </div>
        } />
        <Route path="/order" element={
            <div>
                <Sidebar/>
                <Order />
            </div>
        } />
        <Route path="/stock" element={
            <div>
                <Sidebar/>
                <Stock />
            </div>
        } />
        </Route>
    )
)

export default Router;
