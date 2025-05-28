import { Container, EditIcon, DeleteIcon, SellButton } from './styles';
import { api } from '../../services/api';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export function ProductCard({ data, onClick, onDelete, onSell }) {
  const navigate = useNavigate();

  function handleEdit(e) {
    e.stopPropagation();
    navigate(`/produto/${data.id}/editar`);
  }

  function handleDelete(e) {
    e.stopPropagation();
    if (confirm(`Tem certeza que deseja excluir o produto "${data.nome}"?`)) {
      onDelete(data.id);
    }
  }

  function handleSell(e) {
    e.stopPropagation();
    onSell(data);
  }

  return (
    <Container onClick={onClick}>
      <div className="actions">
        <EditIcon onClick={handleEdit}>
          <FiEdit2 size={16} />
        </EditIcon>
        <DeleteIcon onClick={handleDelete}>
          <FiTrash2 size={16} />
        </DeleteIcon>
      </div>
      <img src={`${api.defaults.baseURL}${data.imagem}`} alt={data.nome} />
      <h2>{data.nome}</h2>
      <p>Preço: R$ {data.preco.toFixed(2)}</p>
      <p>Quantidade: {data.quantidade}</p>
      <p>Status: {data.status ? 'Ativo' : 'Inativo'}</p>

      <SellButton onClick={handleSell}>
        Vender
      </SellButton>
    </Container>
  );
}