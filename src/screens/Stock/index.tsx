import React, { useState } from 'react';
import TableHead from "../../components/TableHead/index.tsx";
import TableItem from "../../components/TableItem/index.tsx";
import { useProducts, AddButton, UpdateButton, DeleteButton } from "../../components/Products/index.tsx";



// Componente da tela de estoque
const Stock: React.FC = () => {

  
  const { products } = useProducts();

  const [SearchItem, setSearchItem] = useState('')
    
  const SearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value.toLowerCase())
  };
    
  return (
    <div>
      <h1 className="max-w-lg text-3xl font-semibold leading-normal text-gray-900 ">Estoque</h1>
      {/* Adicione qualquer conteúdo adicional que você queira exibir no dashboard */}
      <br></br>
      <div className="relative">
  <input
    type="text"
    defaultValue=''
    placeholder="Buscar produto"
    onChange={SearchChange}
    className="p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
  />
  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
    <span className="material-symbols-outlined text-gray-500">search</span>
  </span>
</div>
      <br></br>
      <br></br>
      <div>
          <TableHead 
          head_1='ID' 
          head_2='Nome' 
          head_3='Categoria' 
          head_4='Valor'
          head_5='Estoque'
          add= {<AddButton></AddButton>} >
          {(products.filter(product =>
      product.name.toLowerCase().includes(SearchItem))).map((product) => (
            <TableItem
            item_1={'#'+product.id}
            item_2={product.name}
            item_3={product.category}
            item_4={`R\$${product.value}`}
            item_5={product.stock.toString()}>
              <UpdateButton id={''+product.id}></UpdateButton>
              <DeleteButton id={''+product.id}></DeleteButton>
            </TableItem>
          ))}
          </TableHead>
        </div>
    </div>
  );
};

export default Stock;