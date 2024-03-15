/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode, createContext, useState, useContext } from 'react';
import { useProducts } from "../Products/index.tsx";
import { useCustomers } from "../Customers/index.tsx";


interface Orders {
    id: number;
    customer: string;
    products: Array<string>;
    quantities: Array<number>;
    total: Array<number>;
  }


interface OrdersContextProps {
    orders: Orders[];
    addOrder: (newProduct: Orders) => void;
    updateOrder: (updatedOrders: Orders[]) => void;
}


const OrdersContext = createContext<OrdersContextProps | undefined>(undefined);

interface OrdersProviderProps {
    children: ReactNode;
  }

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

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders deve ser usado dentro de um OrdersProvider');
  }
  return context;
};




export const AddButton: React.FC = () => {

    const { orders, addOrder } = useOrders();
    const { products, updateProduct } = useProducts();
    const { customers } = useCustomers();

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    
    const [orderProducts, setOrderProducts] = useState([{id: 1, name:'', quantity:1, total:0}])


    // Função do onSubmit
    const AddOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const id = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;
        
        const customer = formData.get('customer');
        const productName = formData.get('product');
        const quantity = Number(formData.get('quantity'));

        const selectedProduct = products.find(product => product.name === productName);

        if (!selectedProduct) {
            alert(`Produto com nome ${productName} não encontrado.`);
            return;
          }
        if (selectedProduct.stock < quantity) {
            alert('Quantidade maior do que a disponível do estoque.');
            return;
        }

        const total = (parseInt((selectedProduct.value * 100 * quantity).toFixed(0), 10))/100;

        // Tirando a quantidade do produto no pedido do estoque
        const updatedProducts = [...products]
        const index = products.findIndex(product => product.name === productName);
        
        updatedProducts[index].stock -= quantity;

        updateProduct(updatedProducts)
        if (!customer || !productName || quantity <= 0 || total <= 0) {
            alert('Preencha todos os campos obrigatórios.');
            return;
            }

        const newOrder = {
            id: id,
            customer: customer as string,
            products: orderProducts.map(({ name }) => name),
            quantities: orderProducts.map(({ quantity }) => quantity),
            total: orderProducts.map(({ total }) => total),
        };

        addOrder(newOrder);
        setModalOpen(false);
    };

    
    const [SearchItems, setSearchItem] = useState([{id: 1, name:''}])
        
    const ProductSearchChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const updatedSearchItem = [...SearchItems]
        updatedSearchItem.find(item => item.id === id).name = e.target.value.toLowerCase();
        setSearchItem(updatedSearchItem)

      };

    const ProductChange = (e: React.ChangeEvent<HTMLSelectElement>, id: number) => {
      const updatedProducts = [...orderProducts];
      updatedProducts.find(item => item.id === id).name = e.target.value.toLowerCase();
      setOrderProducts(updatedProducts);

    }

    const [SearchCustomer, setSearchCustomer] = useState('')

    const CustomerSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchCustomer(e.target.value.toLowerCase())
    };

    const AddProduct = () => {
        setOrderProducts([...orderProducts, {id:orderProducts[orderProducts.length - 1].id + 1, name:'', quantity:1, total:0}])
        setSearchItem([...SearchItems, {id:SearchItems[SearchItems.length - 1].id + 1, name:''}])
    }


    const QuantitiesChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
      const updatedProducts = [...orderProducts];
      const qtt = Number(e.target.value)

      updatedProducts.find(item => item.id === id).quantity = qtt;
      console.log(updatedProducts)
      const productName = updatedProducts.find(item => item.id === id).name


      const selectedProduct = products.find(product => product.name === productName);

      if (!selectedProduct) {
          alert(`Produto com nome ${productName} não encontrado.`);
        }
      if (selectedProduct.stock < qtt) {
          alert('Quantidade maior do que a disponível do estoque.');
      }

      const total = (parseInt((selectedProduct.value * 100 * qtt).toFixed(0), 10))/100;

      updatedProducts.find(item => item.id === id).total = total

      setOrderProducts(updatedProducts);
    };

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
                    defaultValue={orderProduct.name}
                    onChange={(e) => ProductSearchChange(e, orderProduct.id)}
                    placeholder="Buscar produto"
                    className="w-full border p-2 rounded mb-4 mr-2"/>
                    {/* SELECT PRODUCT */}
                    <select id="product" 
                    name="product"
                    onChange={(e) => ProductChange(e, orderProduct.id)}
                    className="w-full border p-2 rounded mb-4">
                    {isSelected && <option value="" disabled selected hidden>Selecione um produto</option>}
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
                      Valor: {orderProduct.total}
                    </div>
                    {/* ADD PRODUCT BUTTON */}
                    <button 
                    type="button"
                    className="border  rounded px-1 mb-4 mr-1 material-symbols-outlined hover:bg-slate-200"
                    onClick={AddProduct}>
                    add
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

    
interface DeleteButtonProps {
  id: string;
}
export const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {

  const { orders, updateOrder } = useOrders();
  const { products, updateProduct } = useProducts();

  // Função do onClick
  const DeleteOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const index = orders.findIndex(order => order.id.toString() === id);

    const updatedOrders = [...orders];

    // Devolvendo a quantidade do pedido ao estoque
    const updatedProducts = [...products];
    const Pindex = products.findIndex(product => product.name === orders[index].product);
    updatedProducts[Pindex].stock += orders[index].quantity;

    updateProduct(updatedProducts);
    if (index !== -1) {
      updatedOrders.splice(index, 1);
    }
    updateOrder(updatedOrders);
  };

  return (
    <div>
      <button id={id} onClick={DeleteOrder}><span className="material-symbols-outlined">
        delete</span></button>
    </div>
  );
};