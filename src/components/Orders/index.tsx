/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode, createContext, useState, useContext } from 'react';
import { useProducts } from "../Products/index.tsx";
import { useCustomers } from "../Customers/index.tsx";

/* INTERFACE ORDERS */
interface Orders {
    id: number;
    customer: string;
    products: Array<string>;
    quantities: Array<number>;
    total: Array<number>;
  }

/* INTERFACE ORDERS CONTEXT PROPERTIES */
interface OrdersContextProps {
    orders: Orders[];
    addOrder: (newProduct: Orders) => void;
    updateOrder: (updatedOrders: Orders[]) => void;
}


/* ORDERSCONTEXT */
const OrdersContext = createContext<OrdersContextProps | undefined>(undefined);


/* INTERFACE ORDERS PROVIDER PROPERTIES */
interface OrdersProviderProps {
    children: ReactNode;
  }

/* ORDERS PROVIDER */
export const OrdersProvider: React.FC<OrdersProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Orders[]>([]);

  const addOrder = (newOrder: Orders) => {
    setOrders([...orders, newOrder]);
  };
  const updateOrder = (updatedOrders: Orders[]) => {
    setOrders(updatedOrders)
    };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};


/* USE ORDERS */
export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders deve ser usado dentro de um OrdersProvider');
  }
  return context;
};


/* ADD ORDER BUTTON */
export const AddButton: React.FC = () => {

    
    /* USE CONTEXTS */
    const { orders, addOrder } = useOrders();
    const { products, updateProduct } = useProducts();
    const { customers } = useCustomers();

    
    /* MODAL OPEN/CLOSE */
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => {
      setOrderProducts([{id: 1, name:'', quantity:0, total:0, isSelected:false}])
      setModalOpen(false)
    };
    
    /* ORDER PRODUCTS */
    const [orderProducts, setOrderProducts] = useState([{id: 1, name:'', quantity:0, total:0, isSelected:false}])


    /* ONSUBMIT FUNCTION */
    const AddOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const id = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;
        
        const customer = formData.get('customer');
       
        /* VALIDATIONS */
        let countValidation = 0
        const value_counts: { [key: string]: number } = {}

        orderProducts.forEach((product)=> {
          /* COUNTING DIFFERENT PRODUCTS */
          if (value_counts[product.name]) {
            value_counts[product.name] += product.quantity;
          } else {
            value_counts[product.name] = product.quantity;
          }

          /* NO EMPTY VALUES CONDITION */
          if (product.name === "" || product.quantity < 1){
            countValidation ++
          }
        })

        if (countValidation){
          alert('Preencha os campos corretamente')
          return
        }

        /* STOCK VALIDATION */
        const stockValidation: { [key: string]: Array<number> } = {}
        Object.entries(value_counts).forEach(([productName, count]) => {
          const index = products.findIndex(product => product.name.toLowerCase() === productName.toLowerCase())
          if (products[index].stock < count){
            stockValidation[productName] = [products[index].stock, count]
          }
        });
        
        let msg: string = '';

        Object.entries(stockValidation).forEach(([productName, stockInfo]) => {
          msg += `Estoque insuficiente de ${productName} - Em estoque: ${stockInfo[0]}. Quantidade pedida: ${stockInfo[1]} \n`

        });

      
        if(!stockValidation.length){
          alert(msg)
          return
        }
        
        /* STOCK UPDATE */

        /*

          ATUALIZAR O VALOR DOS PRODUTOS

        */

        const newOrder = {
            id: id,
            customer: customer as string,
            products: orderProducts.map(({ name }) => name),
            quantities: orderProducts.map(({ quantity }) => quantity),
            total: orderProducts.map(({ total }) => total),
        };

        addOrder(newOrder);
        setModalOpen(false);
        setOrderProducts([{id: 1, name:'', quantity:0, total:0, isSelected:false}])
    };

    
    /* SEARCH PRODUCTS */
    const [SearchItems, setSearchItem] = useState([{id: 1, name:''}])
        
    const ProductSearchChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const updatedSearchItem = [...SearchItems]
        updatedSearchItem.find(item => item.id === id).name = e.target.value.toLowerCase();
        setSearchItem(updatedSearchItem)
        const updatedProducts = [...orderProducts];

        updatedProducts.find(item => item.id === id).isSelected = true;
        
        updatedProducts.find(item => item.id === id).name = products.filter(product =>
          product.name.toLowerCase().includes(e.target.value.toLowerCase()))[0].name.toLowerCase()
        setOrderProducts(updatedProducts);
      };


    /* ONCHANGE SELECT PRODUCT */
    const ProductChange = (e: React.ChangeEvent<HTMLSelectElement>, id: number) => {
      const updatedProducts = [...orderProducts];
      updatedProducts.find(item => item.id === id).name = e.target.value;
      setOrderProducts(updatedProducts);
    }

    /* SEARCH CUSTOMER */
    const [SearchCustomer, setSearchCustomer] = useState('')

    const CustomerSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchCustomer(e.target.value.toLowerCase())
    };

    /* ADD ANOTHER PRODUCT TO ORDER */
    const AddProduct = () => {
        setOrderProducts([...orderProducts, {id:orderProducts[orderProducts.length - 1].id + 1, name:'', quantity:0, total:0, isSelected:false}])
        setSearchItem([...SearchItems, {id:SearchItems[SearchItems.length - 1].id + 1, name:''}])
    }

    /* DELETE PRODUCT FROM ORDER LIST */
    const DeleteProduct = (id:number) => {
      const updatedOrderProducts = [...orderProducts]
      const updatedSearchItems = [...SearchItems]

      const index = updatedOrderProducts.findIndex(item => item.id === id)

      updatedOrderProducts.splice(index, 1)
      updatedSearchItems.splice(index, 1)

      setOrderProducts(updatedOrderProducts)
      setSearchItem(updatedSearchItems)
  }

    /* QUANTITY ONCHANGE */
    const QuantitiesChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
      const updatedProducts = [...orderProducts];
      const qtt = Number(e.target.value)

      updatedProducts.find(item => item.id === id).quantity = qtt;
      console.log(updatedProducts)
      const productName = updatedProducts.find(item => item.id === id).name


      const selectedProduct = products.find(product => product.name.toLowerCase() === productName.toLowerCase());

      const total = (parseInt((selectedProduct.value * 100 * qtt).toFixed(0), 10))/100;

      updatedProducts.find(item => item.id === id).total = total

      setOrderProducts(updatedProducts);
    };

    /* BUTTON/MODAL HTML */
    return (
    <div>
        <button onClick={openModal}><span className="material-symbols-outlined hover:animate-spin">
            add</span></button>

        {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal bg-white p-8 rounded">
            <h2 className="text-2xl font-bold mb-4">Adicionar Pedido</h2>
            {/* FORM */}
            <form onSubmit={AddOrder}>
                {/* CUSTOMER */}
                <label htmlFor="customer" className="block mb-2">
                Cliente:
                </label>
                <div className='flex'>
                  <input 
                  type="text" 
                  onChange={CustomerSearchChange}
                  placeholder="Buscar cliente"
                  className="w-full border p-2 rounded mb-4"/>
                  {/* SELECT CUSTOMER */}
                  <select id="customer" name="customer"
                      className="w-full border p-2 rounded mb-4">
                          {
                              ([{name:'Não Informado'}, ...customers.filter(customer =>
                                customer.name.toLowerCase().includes(SearchCustomer))]).map(customer => 
                          <option value={customer.name}>{customer.name}</option>)
                          }
                      </select>
                </div>
                <br />
                {/* PRODUCTS */}
                <label htmlFor="product" className="block mb-2">
                Produto:
                </label>
                {orderProducts.map((orderProduct) => (<div className='flex'>
                    {/* SEARCH PRODUCT */}
                    <input
                    type="text"
                    onChange={(e) => ProductSearchChange(e, orderProduct.id)}
                    placeholder="Buscar produto"
                    className="w-full border p-2 rounded mb-4 mr-2"/>
                    {/* SELECT PRODUCT */}
                    <select id="product" 
                    name="product"
                    onChange={(e) => ProductChange(e, orderProduct.id)}
                    className="w-full border p-2 rounded mb-4">
                    {!orderProduct.isSelected && <option value="" disabled selected hidden>Selecione um produto</option>}
                        {
                            (products.filter(product =>
                                product.name.toLowerCase().includes(SearchItems.find(item => item.id === orderProduct.id).name))).map(product => 
                        <option value={product.name}>{product.name}</option>)
                        }
                    </select>
                    {/* QUANTITY */}
                    <input 
                    type="number"
                    id="quantity" 
                    name="quantity"
                    onChange={(e) => QuantitiesChange(e, orderProduct.id)}
                    placeholder="Quantidade"
                    className="w-full border p-2 rounded mb-4"/>
                    {/* VALUES */}
                    <div className="w-full border p-2 rounded mb-4">
                      Valor: R${orderProduct.total}
                    </div>
                    {/* ADD PRODUCT BUTTON */}
                    <button 
                    type="button"
                    className="border  rounded px-1 mb-4 mr-1 material-symbols-outlined hover:bg-slate-200"
                    onClick={AddProduct}>
                    add
                    </button>
                    {/* DELETE PRODUCT BUTTON */}
                    <button 
                    type="button"
                    className="border  rounded px-1 mb-4 mr-1 material-symbols-outlined hover:bg-slate-200"
                    onClick={() => (DeleteProduct(orderProduct.id))}>
                    delete
                    </button>
                </div>
                ))}
                <br />
                <div>
                    {/* ADD BUTTON */}
                <button 
                    type="submit"
                    className="mx-2 bg-green-600 text-white px-4 py-2 rounded">
                    Adicionar 
                    </button>
                    {/* CANCEL BUTTON */}
                <button
                    type="button"
                    onClick={closeModal}
                    className="mx-2 bg-red-600 text-white px-4 py-2 rounded">
                    Cancelar
                    </button>
                </div>
            </form>
            </div>
        </div>
        )}
    </div>
    );
    };

/* INTERFACE DELETE ORDER BUTTON PROPERTIES */
interface DeleteButtonProps {
  id: number;
}


/* DELETE ORDER BUTTON */
export const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {

  const { orders, updateOrder } = useOrders();
  const { products, updateProduct } = useProducts();

  /*
      ARRUMAR O BOTÃO
  */


  /* ONCLICK FUNCTION */
  const DeleteOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const index = orders.findIndex(order => order.id === id);

    const updatedOrders = [...orders];

    /* GIVING BACK ORDER QUANTITIES TO STOCK */
    const updatedProducts = [...products];
    const Pindex = products.findIndex(product => product.name.toLowerCase() === orders[index].product.toLowerCase());
    updatedProducts[Pindex].stock += orders[index].quantity;

    updateProduct(updatedProducts);
    if (index !== -1) {
      updatedOrders.splice(index, 1);
    }
    updateOrder(updatedOrders);
  };

  /* DELETE BUTTON HTML */
  return (
    <div>
      <button id={id} onClick={DeleteOrder}><span className="material-symbols-outlined">
        delete</span></button>
    </div>
  );
};
  
/* INTERFACE SHOW ORDER PRODUCTS BUTTON PROPERTIES */
interface OrderProductsButtonProps {
  order: Orders;
}

/* SHOW ORDER PRODUCTS BUTTON */
export const OrderProductsButton: React.FC<OrderProductsButtonProps>= ({order}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div>
      <button onClick={openModal} className='block p-2 hover:bg-gray-300 transition duration-300 rounded-md'> Produtos </button>

      {isModalOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='modal bg-white p-8 rounded relative'>
            <button onClick={closeModal}
                    className="material-symbols-outlined absolute top-0 right-0 mt-1 mr-1">close</button>
            <table>
              <thead> <tr className='border-b bg-gray-50 uppercase'>
                <th className='px-5 py-4'>Produto</th> 
                <th className='px-5 py-4'>Quantidade</th> 
                <th className='px-5 py-4'>Total</th>
                </tr></thead>
              <tbody>
                {order.products.map((product, index) => {
                  const quantity = order.quantities[index]
                  const total = order.total[index]
                  return(
                    <tr className='border-b rounded-lg bg-gray-50'>
                      <td className='px-5 py-4'>{product}</td>
                      <td className='px-5 py-4'>{quantity}</td>
                      <td className='px-5 py-4'>R${total}</td>
                    </tr>
                        )}
                )}
              </tbody>
            </table>
            <p>Total: R${order.total.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</p>
          </div>
        </div>
      )}
    </div>
  )
}



  /*
      CRIAR UM BOTÃO DE EDITAR
  */