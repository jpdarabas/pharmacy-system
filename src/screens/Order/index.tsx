import React, { useState } from 'react';
import TableHead from "../../components/TableHead/index.tsx";
import TableItem from "../../components/TableItem/index.tsx";
import Search from "../../components/Search/index.tsx";
import { useOrders, AddButton, DeleteButton } from "../../components/Orders/index.tsx";

// Componente da tela de pedidos
const TeladePedidos: React.FC = () => {
 
  
  const { orders } = useOrders()

  const [SearchItem, setSearchItem] = useState('')
    
  const SearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value.toLowerCase())
  };

  return (
    <div>
      <h1 className="max-w-lg text-3xl font-semibold leading-normal text-gray-900 ">Pedidos</h1>
      <br></br>
      <Search searchChange={SearchChange} placeHolder='Buscar por cliente'></Search>
      <br></br>
      <div>
          <TableHead 
          head_1='ID' 
          head_2='Cliente' 
          head_3='Produto' 
          head_4='Quantidade'
          head_5='Total'
          add= {<AddButton></AddButton>} >
{(orders.filter(order =>
      order.customer.toLowerCase().includes(SearchItem))).reverse().map((order) => (
        
        <TableItem
        item_1={'#'+order.id}
        item_2={order.customer}
        item_3={order.product}
        item_4={''+order.quantity}
        item_5={`R\$${order.total}`}>
        <DeleteButton id={'' + order.id}></DeleteButton>
        </TableItem>

      ))}
          </TableHead>
        </div>
    </div>
  );
};

export default TeladePedidos;
