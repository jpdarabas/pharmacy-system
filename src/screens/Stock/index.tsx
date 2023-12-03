import TableHead from "../../components/TableHead/index.tsx";
import TableItem from "../../components/TableItem/index.tsx";
import React, { useState } from 'react';




interface StockProps {
  // Pode adicionar propriedades específicas, se necessário
}

const Stock: React.FC<StockProps> = () => {

    
  interface Product {
    name: string;
    category: string;
    value: number;
    stock: number;
  }


  const [products, setProducts] = useState<Product[]>([]);



  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    
    setModalOpen(false);};

  
  const AddProduct = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const form = e.currentTarget;
      const formData = new FormData(form)
      const newProduct = {
        name: formData.get("name") as string,
      category: formData.get("category") as string,
      value: Number(formData.get("value")),
      stock: Number(formData.get("stock")),
      };
  
      setProducts([...products, newProduct]);
      setModalOpen(false);
    };



  const AddButton: React.FC = () => {

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
              type="number" 
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

  return (
    <div>
      <h1>Olá, você está na tela de estoque e cadastro!</h1>
      {/* Adicione qualquer conteúdo adicional que você queira exibir no dashboard */}
      <br></br>
      <input
        type="text"
        placeholder="Escolha o produto"
      />
      <br></br>
      <br></br>
      <div>
          <TableHead 
          head_1='Nome' 
          head_2='Categoria' 
          head_3='Valor' 
          head_4='Estoque'
          add= {<AddButton></AddButton>} >

{products.map((product) => (
        
        <TableItem
        item_1={product.name}
        item_2={product.category}
        item_3={product.value}
        item_4={product.stock}>
          <button className='mx-3'>
            <span className="material-symbols-outlined">edit</span>
          </button> 
          <button className='mx-3'>
          <span className="material-symbols-outlined">delete</span>
          </button>
        </TableItem>

      ))}
          </TableHead>
        </div>
    </div>
  );
};

export default Stock;