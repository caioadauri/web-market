import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Brand, Container, Menu, Search, Content, NewProduct } from './styles';

import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/input';
import { Section } from '../../components/Section';
import { ProductCard } from '../../components/Product';
import { api } from '../../services/api';

export function Home() {

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

   const navigate = useNavigate();

   function handleDetails(id) {
    navigate(`/produto/${id}`);
   }
  
    async function fetchProducts() {
      try {
      const response = await api.get(`/produtos`);
      console.log("RESPONSE:", response.data);
      setProducts(response.data)
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
      }
    }

useEffect(() => {
    fetchProducts()
}, [])

  async function handleDeleteProduct(id) {
    try {
      await api.delete(`/produtos/${id}`);
      alert("Produto excluído com sucesso!");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir produto.");
    }
  }

  function handleSell(product) {
  navigate(`/produto/${product.id}/venda`);
}

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Brand>
        <h1>Web Market</h1>
      </Brand>

      <Header />

      <Menu>
      <li>
        <ButtonText
          title="Produtos"
          isActive={false}
        />
      </li>
      <li>
    <ButtonText
      title="Relatórios"
      onClick={() => navigate("/relatorio")}
    />
  </li>
      </Menu>

      <Search>
        <Input 
        placeholder="Pesquisar pelo produto"
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
      <Content>
        <Section title="Meus produtos">
          {
            filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard
                  key={String(product.id)}
                  data={product}
                  onClick={() => handleDetails(product.id)}
                  onDelete={handleDeleteProduct}
                  onSell={handleSell}
                />
              ))
            ) : (
              <p>Nenhum produto encontrado.</p>
            )
          }
        </Section>
</Content>
      </Content>

      <NewProduct to='/new'>
        <FiPlus />
          Cadastrar produto
      </NewProduct>

    </Container>

  )
}
