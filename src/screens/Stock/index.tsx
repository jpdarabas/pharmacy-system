import React from 'react';

interface StockProps {
  // Pode adicionar propriedades específicas, se necessário
}

const Dashboard: React.FC<StockProps> = () => {
  return (
    <div className='ml-48'>
      <h1>Olá, você está na tela de estoque e cadastro!</h1>
      {/* Adicione qualquer conteúdo adicional que você queira exibir no dashboard */}
      <br></br>
      <input
        type="text"
        placeholder="Escolha o produto"
      />
      <br></br>
      <br></br>
      <table>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Quantidade</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Paracetamol</td>
          <td>3</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Dipirona</td>
          <td>5</td>
        </tr>
      </table>
    </div>
  );
};

export default Dashboard;