import React from 'react';

interface OrderProps {
  // Pode adicionar propriedades específicas, se necessário
}

const Dashboard: React.FC<OrderProps> = () => {
  return (
    <div className='ml-48'>
      <h1>Olá, você está na tela de pedido!</h1>
      {/* Adicione qualquer conteúdo adicional que você queira exibir no dashboard */}
    </div>
  );
};

export default Dashboard;
