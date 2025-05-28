import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Input } from '../../components/input';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';
import { Container, Form } from './styles';
import { api } from '../../services/api';

export function SellProduct() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [quantidadeVendida, setQuantidadeVendida] = useState(1);
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await api.get(`/produtos/${id}`);
        setProduto(response.data);
      } catch (error) {
        alert("Erro ao buscar produto");
        navigate(-1);
      }
    }
    fetchProduct();
  }, [id]);

  async function handleSale() {
    if (!quantidadeVendida || quantidadeVendida <= 0) {
      return alert("Informe uma quantidade válida.");
    }

    try {
      await api.post('/vendas', {
        id_produto: id,
        quantidade: Number(quantidadeVendida)
      });
      alert("Venda registrada com sucesso!");
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.erro || "Erro ao registrar venda.");
    }
  }

  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Vender Produto</h1>
            <ButtonText title="Voltar" onClick={handleBack} />
          </header>

          {produto && (
            <>
              <p><strong>{produto.nome}</strong></p>
              <p>Estoque atual: {produto.quantidade}</p>
              <p>Preço: R$ {produto.preco.toFixed(2)}</p>

              <Section title="Quantidade a vender">
                <Input
                  type="number"
                  min="1"
                  value={quantidadeVendida}
                  onChange={e => setQuantidadeVendida(e.target.value)}
                />
              </Section>

              <Section title="Total da venda">
                <p><strong>R$ {(produto.preco * quantidadeVendida).toFixed(2)}</strong></p>
              </Section>

              <Button title="Finalizar Venda" onClick={handleSale} />
            </>
          )}
        </Form>
      </main>
    </Container>
  );
}
