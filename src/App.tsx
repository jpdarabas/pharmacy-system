import Router from "./Router/router"
import { RouterProvider } from "react-router-dom"
import { ProductsProvider } from "./components/Products/index.tsx";
import { OrdersProvider } from "./components/Orders/index.tsx";


function App() {
  return (
    <OrdersProvider>
      <ProductsProvider>
        <RouterProvider router={Router} />
      </ProductsProvider>
    </OrdersProvider>
  )
}
export default App