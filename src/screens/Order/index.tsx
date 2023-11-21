import React, { useState } from 'react';

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
      <h1>Tela de Pedidos</h1>
      <ul>
        {state.orders.map((order) => (
          <li key={order.id}>
            {order.product} - Quantidade: {order.quantity}
            <button onClick={() => removeOrder(order.id)}>Remover</button>
            <input
              type="number"
              value={order.quantity}
              onChange={(e) => updateOrderQuantity(order.id, parseInt(e.target.value))}
            />
          </li>
        ))}
      </ul>
      <div>
        <h2>Adicionar Novo Pedido</h2>
        <label>
          Produto:
          <input
            type="text"
            value={state.newOrderProduct}
            onChange={(e) => setState({ ...state, newOrderProduct: e.target.value })}
          />
        </label>
        <label>
          Quantidade:
          <input
            type="number"
            value={state.newOrderQuantity}
            onChange={(e) => setState({ ...state, newOrderQuantity: parseInt(e.target.value) })}
          />
        </label>
        <button onClick={addOrder}>Adicionar Pedido</button>
      </div>
    </div>
  );
};

export default TeladePedidos;
