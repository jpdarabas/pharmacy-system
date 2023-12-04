import React, { ReactNode, createContext, useState, useContext } from 'react';



interface Product {
    id: number;
    name: string;
    category: string;
    value: number;
    stock: number;
  }


interface ProductsContextProps {
    products: Product[];
    addProduct: (newProduct: Product) => void;
}


const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

interface ProductsProviderProps {
    children: ReactNode;
  }

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts deve ser usado dentro de um ProductsProvider');
  }
  return context;
};




export const AddButton: React.FC = () => {

    const { products, addProduct } = useProducts();

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);;


    const AddProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form)

        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1
        const name = formData.get("name");
        const category = formData.get("category");
        const value = formData.get("value");
        const stock = Number(formData.get("stock"));

        
        const numericValue = value ? parseFloat(Number(value.toString().replace(",", ".")).toFixed(2)) : -1;
        
        if (!name || !category || numericValue <= 0 || stock < 0) {
        alert('Preencha todos os campos obrigatórios.');
        return;
        }
        

        const newProduct = {
        id: id,
        name: name as string,
        category: category as string,
        value: numericValue,
        stock: stock,
        };

        addProduct(newProduct);
        setModalOpen(false);
    };

return (
<div>
    <button onClick={openModal}><span className="material-symbols-outlined">
        add</span></button>

    {isModalOpen && (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="modal bg-white p-8 rounded">
        <h2 className="text-2xl font-bold mb-4">Adicionar Produto</h2>
        <form onSubmit={AddProduct}>
            <label htmlFor="name" className="block mb-2">
            Nome:
            </label>
            <input 
            type="text" 
            id="name" 
            name="name"
            className="w-full border p-2 rounded mb-4"/>
            <br />
            <label htmlFor="category" className="block mb-2">
            Categoria:
            </label>
            <input 
            type="text" 
            id="category" 
            name="category"
            className="w-full border p-2 rounded mb-4"/>
            <br />
            <label htmlFor="value" className="block mb-2">
            Valor:
            </label>
            <input 
            type="text"
            pattern="[0-9]+([,\.][0-9]+)?"
            step="0.01"
            id="value" 
            name="value"
            className="w-full border p-2 rounded mb-4"/>
            <br />
            <label htmlFor="stock" className="block mb-2">
            Quantidade:
            </label>
            <input 
            type="number" 
            defaultValue={1}
            id="stock" 
            name="stock"
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