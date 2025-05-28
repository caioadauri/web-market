import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Container, Content } from './styles';
import { api } from '../../services/api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export function Relatorio() {
  const [dados, setDados] = useState({ labels: [], valores: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/relatorio/vendas');
        const relatorio = response.data;

        const labels = relatorio.map(item => item.data);
        const valores = relatorio.map(item => item.total);

        setDados({ labels, valores });
      } catch (error) {
        console.error("Erro ao buscar relatório de vendas", error);
      }
    }

    fetchData();
  }, []);

  const data = {
    labels: dados.labels,
    datasets: [
      {
        label: 'Total vendido por dia (R$)',
        data: dados.valores,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <Container>
      <Header />
      <Content>
        <h1>Relatório de Vendas (últimos 7 dias)</h1>
        <Line data={data} />
      </Content>
    </Container>
  );
} 