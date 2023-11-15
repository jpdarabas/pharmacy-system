import React from 'react';

interface StockProps {
  // Pode adicionar propriedades específicas, se necessário
}

const Dashboard: React.FC<StockProps> = () => {
  return (
    <div>
      <h1>Olá, você está na tela de estoque e cadastro!</h1>
      {/* Adicione qualquer conteúdo adicional que você queira exibir no dashboard */}
    </div>
  );
};

export default Dashboard;