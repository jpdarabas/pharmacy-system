import './screens/Dashboard/App.css'
import Router from "./Router/router"
import { RouterProvider } from "react-router-dom"

function App() {
  return (
    <RouterProvider router={Router} />
  )
}
export default App

