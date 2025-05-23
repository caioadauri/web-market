import { Container } from './styles';
import { api } from '../../services/api';

export function ProductCard({ data, onClick }) {
  return (
    <Container onClick={onClick}>
      <img src={`${api.defaults.baseURL}${data.imagem}`} alt={data.nome} />
      <h2>{data.nome}</h2>
      <p>Preço: R$ {data.preco.toFixed(2)}</p>
      <p>Quantidade: {data.quantidade}</p>
      <p>Status: {data.status ? 'Ativo' : 'Inativo'}</p>
    </Container>
  );
}