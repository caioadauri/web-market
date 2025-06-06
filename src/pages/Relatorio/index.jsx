import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Container, Content, Form } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { api } from '../../services/api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export function Relatorio() {
  const [dados, setDados] = useState({ labels: [], valores: [] });

  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  useEffect(() => {
  async function fetchData() {
    try {
      const response = await api.get("/relatorio-vendas");
      const relatorio = response.data;

      const labels = Object.keys(relatorio);
      const valores = labels.map(dia => relatorio[dia].total);
      const quantidades = labels.map(dia => relatorio[dia].quantidade);

      setDados({ labels, valores, quantidades, detalhado: relatorio });
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
      label: 'Faturamento diário (R$)',
      data: dados.valores,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.3
    },
    {
      label: 'Quantidade de produtos vendidos',
      data: dados.quantidades,
      borderColor: 'orange',
      tension: 0.3
    }
  ]
};

  return (
    <Container>
      <Header />
      <main>
        <Form>
        <ButtonText 
                      title="Voltar"
                      onClick={handleBack}
                    />
      <Content>
        <h1>Relatório de Vendas (últimos 7 dias)</h1>
        <Line data={data} />
      </Content>
      </Form>
      </main>
    </Container>
  );
} 