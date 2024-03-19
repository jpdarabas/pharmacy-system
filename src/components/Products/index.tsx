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
    updateProduct: (updatedProducts: Product[]) => void;
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

  const updateProduct = (updatedProducts: Product[]) => {
    setProducts(updatedProducts)
    };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts deve ser usado dentro de um ProductsProvider');
  }
  return context;
};

interface ModalProps {
    add: (e: React.FormEvent<HTMLFormElement>) => void;
    close: () => void;
    product: Product | null;
    title: string;
  }

const Modal: React.FC<ModalProps> = ({add, close, product, title}) => {

    return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="modal bg-white p-8 rounded">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={add}>
            <label htmlFor="name" className="block mb-2">
            Nome:
            </label>
            <input 
            type="text" 
            id="name" 
            name="name"
            defaultValue={product ? product.name : ''}
            className="w-full border p-2 rounded mb-4"/>
            <br />
            <label htmlFor="category" className="block mb-2">
            Categoria:
            </label>
            <input 
            type="text" 
            id="category" 
            name="category"
            defaultValue={product ? product.category : ''}
            className="w-full border p-2 rounded mb-4"/>
            <br />
            <label htmlFor="value" className="block mb-2">
            Valor:
            </label>
            <input 
            type="text"
            pattern="[0-9]+([,\.][0-9]+)?"
            id="value" 
            name="value"
            defaultValue={product ? product.value : ''}
            className="w-full border p-2 rounded mb-4"/>
            <br />
            <label htmlFor="stock" className="block mb-2">
            Quantidade:
            </label>
            <input 
            type="number" 
            id="stock" 
            name="stock"
            defaultValue={product ? product.stock : ''}
            className="w-full border p-2 rounded mb-4"/>
            <br />
            <div>
            <button 
                type="submit"
                className="mx-2 bg-green-600 text-white px-4 py-2 rounded">
                Confirmar 
                </button>
            <button
                type="button"
                onClick={close}
                className="mx-2 bg-red-600 text-white px-4 py-2 rounded">
                Cancelar
                </button>
            </div>
        </form>
        </div>
    </div>
)}

export const AddButton: React.FC = () => {

    const { products, addProduct } = useProducts();
    
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const AddProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form)

        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1
        const name = formData.get("name") as string;
        const category = formData.get("category") as string;
        const value = formData.get("value");
        const stock = Number(formData.get("stock"));

        
        const numericValue = value ? parseFloat(Number(value.toString().replace(",", ".")).toFixed(2)) : -1;
        
        if (!name || !category || numericValue <= 0 || stock < 0) {
        alert('Preencha todos os campos obrigatórios.');
        return;
        }
        
        if (products.find(product =>
            product.name.toLowerCase().includes(name.toLowerCase()))) {
                alert(`O produto ${name} já foi inserido.`);
                return;
            }

        const newProduct = {
        id: id,
        name: name,
        category: category,
        value: numericValue,
        stock: stock,
        };

        addProduct(newProduct);
        setModalOpen(false);
    };

return (
<div>
    <button onClick={openModal}><span className="material-symbols-outlined hover:animate-spin">
        add</span></button>

    {isModalOpen && (
        <Modal title='Adicionar produto' add={AddProduct} close={closeModal} product={null}></Modal>
    )}
</div>
);
};


interface UpdateButtonProps {
    id: string;
  }
export const UpdateButton: React.FC<UpdateButtonProps> = ({id}) => {

    const { products, updateProduct } = useProducts();
    
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    
    const index = products.findIndex(product => product.id.toString() === id);

    const updatedProducts = [...products];

    const UpdateProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form)

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
        id: Number(id),
        name: name as string,
        category: category as string,
        value: numericValue,
        stock: stock,
        };

        updatedProducts[index] = newProduct
        
        updateProduct(updatedProducts);
        setModalOpen(false);
    };

  return (
  <div>
      <button id={id} onClick={openModal}><span className="material-symbols-outlined">
          edit</span></button>

      {isModalOpen && (
          <Modal title='Editar produto'  add={UpdateProduct} close={closeModal} product={updatedProducts[index]}></Modal>
      )}
  </div>
  );
};

interface DeleteButtonProps {
    id: string;
  }
export const DeleteButton: React.FC<DeleteButtonProps> = ({id}) => {

    const { products, updateProduct } = useProducts();

    const DeleteProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const index = products.findIndex(product => product.id.toString() === id);

        const updatedProducts = [...products];

        if (index !== -1) {
            updatedProducts.splice(index, 1);
          }
        updateProduct(updatedProducts);
    };

return (
<div>
    <button id={id} onClick={DeleteProduct}><span className="material-symbols-outlined">
        delete</span></button>
</div>
);
};
