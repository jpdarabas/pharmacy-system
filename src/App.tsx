import Router from "./Router/router"
import { RouterProvider } from "react-router-dom"
import { ProductsProvider } from "./components/Products/index.tsx";

function App() {
  return (
    <ProductsProvider>
      <RouterProvider router={Router} />
    </ProductsProvider>
  )
}
export default App