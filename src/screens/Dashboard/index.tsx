import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const Dashboard: React.FC = () => {
  useEffect(() => {
    const salesData = {
      labels: ['Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [{
        label: 'Produtos Vendidos',
        data: [12, 15, 9, 11, 4],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      }]
    };

    const ordersData = {
      labels: ['Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [{
        label: 'Número de Pedidos',
        data: [8, 9, 5, 4, 1],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      }]
    };

    const options = {
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            color: 'black',
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: 'black',
          }
        }
      }
    };

    const salesChartCtx = document.getElementById('salesChart') as HTMLCanvasElement;
    const ordersChartCtx = document.getElementById('ordersChart') as HTMLCanvasElement;

    // Destrua os gráficos existentes, se houver
    Chart.getChart(salesChartCtx)?.destroy();
    Chart.getChart(ordersChartCtx)?.destroy();

    // Crie os novos gráficos
    new Chart(salesChartCtx, {
      type: 'bar',
      data: salesData,
      options: options,
    });

    new Chart(ordersChartCtx, {
      type: 'bar',
      data: ordersData,
      options: options,
    });
  }, []);

  const styles: React.CSSProperties = {
    backgroundColor: 'rgb(230, 230, 250)',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  return (
    <div style={styles}>
      <div className="text-4xl mb-4">
        Bem-vindo ao Farma Fácil!
      </div>
      <div className="chart-container">
        <canvas id="salesChart" width="500" height="300"></canvas>
        <canvas id="ordersChart" width="500" height="300"></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
