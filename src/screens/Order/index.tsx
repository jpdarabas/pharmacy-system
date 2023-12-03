import React, { useState } from 'react';
import TableHead from "../../components/TableHead/index.tsx";
import TableItem from "../../components/TableItem/index.tsx";



// Definindo o tipo para os itens de pedido
interface OrderItem {
  id: number;
  product: string;
  quantity: number;
}

// Definindo o tipo de estado para o componente
interface EstadoTelaPedidos {
  orders: OrderItem[];
  newOrderProduct: string;
  newOrderQuantity: number;
}

// Definindo o componente de tela de pedidos
const TeladePedidos: React.FC = () => {
  const [state, setState] = useState<EstadoTelaPedidos>({
    orders: [],
    newOrderProduct: '',
    newOrderQuantity: 1,
  });

  const addOrder = () => {
    const newOrder: OrderItem = {
      id: Date.now(),
      product: state.newOrderProduct,
      quantity: state.newOrderQuantity,
    };

    setState((prevState) => ({
      orders: [...prevState.orders, newOrder],
      newOrderProduct: '',
      newOrderQuantity: 1,
    }));
  };

  const removeOrder = (orderId: number) => {
    setState((prevState) => ({
      ...prevState,
      orders: prevState.orders.filter((order) => order.id !== orderId),
    }));
  };

  const updateOrderQuantity = (orderId: number, newQuantity: number) => {
    setState((prevState) => ({
      ...prevState,
      orders: prevState.orders.map((order) =>
        order.id === orderId ? { ...order, quantity: newQuantity } : order
      ),
    }));
  };

  return (
    <div>
      <h1>Olá, você está na tela de pedidos!</h1>
      {/* Adicione qualquer conteúdo adicional que você queira exibir no dashboard */}
      <br></br>
      <br></br>
      <br></br>
      <div>
          <TableHead 
          head_1='Número' 
          head_2='Cliente' 
          head_3='Produto' 
          head_4='Total'
          add= {<button><span className="material-symbols-outlined">
          add</span></button>} >

{/* {orders.map((order) => (
        
        <TableItem
        item_1={order.name}
        item_2={order.category}
        item_3={order.value}
        item_4={order.stock}>
          <button className='mx-3'>
            <span className="material-symbols-outlined">edit</span>
          </button> 
          <button className='mx-3'>
          <span className="material-symbols-outlined">delete</span>
          </button>
        </TableItem>

      ))} */}
          </TableHead>
        </div>
    </div>
  );
};

export default TeladePedidos;
