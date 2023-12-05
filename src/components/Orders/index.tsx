import React, { ReactNode, createContext, useState, useContext } from 'react';
import { useProducts } from "../Products/index.tsx";


interface Orders {
    id: number;
    customer: string;
    product: string;
    quantity: number;
    total: number;
  }


interface OrdersContextProps {
    orders: Orders[];
    addOrder: (newProduct: Orders) => void;
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

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
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
    const { products } = useProducts();

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);;
    
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

        let updatedProducts = products.find(product => product.name === productName? product.stock -= quantity: product.stock)

        console.log(updatedProducts)
        if (!customer || !productName || quantity <= 0 || total <= 0) {
            alert('Preencha todos os campos obrigatórios.');
            return;
            }

        const newOrder = {
            id: id,
            customer: customer as string,
            product: productName as string,
            quantity: quantity,
            total: total,
        };

        addOrder(newOrder);
        setModalOpen(false);
    };

    
    const [SearchItem, setSearchItem] = useState('')
        
    const SearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.target.value.toLowerCase())
      };

    return (
    <div>
        <button onClick={openModal}><span className="material-symbols-outlined">
            add</span></button>

        {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal bg-white p-8 rounded">
            <h2 className="text-2xl font-bold mb-4">Adicionar Produto</h2>
            <form onSubmit={AddOrder}>
                <label htmlFor="customer" className="block mb-2">
                Cliente:
                </label>
                <input 
                type="text" 
                id="customer" 
                name="customer"
                className="w-full border p-2 rounded mb-4"/>
                <br />
                <label htmlFor="product" className="block mb-2">
                Produto:
                </label>
                <div className='flex'>
                    <input
                    type="text"
                    defaultValue=''
                    onChange={SearchChange}
                    placeholder="Buscar produto"
                    className="w-full border p-2 rounded mb-4 mr-2"
                />
                    <select id="product" name="product"
                    className="w-full border p-2 rounded mb-4">
                        {
                            (products.filter(product =>
                                product.name.toLowerCase().includes(SearchItem))).map(product => 
                        <option value={product.name}>{product.name}</option>)
                        }
                    </select>
                </div>
                <br />
                <label htmlFor="quantity" className="block mb-2">
                Quantidade:
                </label>
                <input 
                type="text"
                id="quantity" 
                name="quantity"
                className="w-full border p-2 rounded mb-4"/>
                <br />
                <div>
                <button 
                    type="submit"
                    className="mx-2 bg-green-600 text-white px-4 py-2 rounded">
                    Adicionar 
                    </button>
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