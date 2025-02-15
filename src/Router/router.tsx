import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import Order from "../screens/Order";
import Stock from "../screens/Stock";
import Customer from "../screens/Customer";
import Sidebar from "../components/Sidebar/index.tsx";

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
                <div className="pl-64 py-16">
                    <Sidebar/>
                    <Order />
                </div>
            } />
            <Route path="/stock" element={
                <div className="pl-64 py-16">
                    <Sidebar/>
                    <Stock />
                </div>
            } />
            <Route path="/customer" element={
                <div className="pl-64 py-16">
                    <Sidebar/>
                    <Customer />
                </div>
            } />
        </Route>
    )
)

export default Router;
