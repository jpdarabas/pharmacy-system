import Router from "./Router/router"
import { RouterProvider } from "react-router-dom"
import { ProductsProvider } from "./components/Products/index.tsx";
import { OrdersProvider } from "./components/Orders/index.tsx";
import { CustomersProvider } from "./components/Customers/index.tsx";


function App() {
  return (
    <CustomersProvider>
      <OrdersProvider>
      <ProductsProvider>
        <RouterProvider router={Router} />
      </ProductsProvider>
    </OrdersProvider>
    </CustomersProvider>
    
  )
}
export default App