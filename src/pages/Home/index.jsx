import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import {Brand, Container, Menu, Search, Content, NewProduct} from './styles'

import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/input';
import { Section } from '../../components/Section';
import { ProductCard } from '../../components/Product';
import { api } from '../../services/api';

export function Home() {

  const [ search, setSearch ] = useState("")
  const [ tags, setTags ] = useState([])
  const [ tagsSelected, setTagsSelected ] = useState([])
  const [ products, setProducts ] = useState([])

  const navigate = useNavigate()

  function handleTagSelected(tagName) {
    if (tagName === 'all') {
      return setTagsSelected([])
    }

    function handleDetails(id) {
      navigate(`/produto/${id}`)
    }

    const alreadySelected = tagsSelected.includes(tagName)
    if (alreadySelected){
      const filteredTags = tagsSelected.filter(tag => tag !== tagName)
      setTagsSelected(filteredTags)
    } else {
      setTagsSelected(prevState => [...prevState, tagName])
    }
  }

  useEffect(() => {
    async function fetchProducts() {
      const response = await api.get(`/produtos`);
      console.log("RESPONSE:", response.data);
      setProducts(response.data)
    }

    fetchProducts()
}, [])

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
      </Menu>

      <Search>
        <Input 
        placeholder="Pesquisar pelo produto" 
        onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
      <Content>
        <Section title="Meus produtos">
          {
          products.map(product => (
          <ProductCard
            key={String(product.id)}
            data={product}
            onClick={() => handleDetails(product.id)}
          />
        ))
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
