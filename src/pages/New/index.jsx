import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Input } from '../../components/input';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';
import { Container, Form } from "./styles";
import { api } from '../../services/api';

export function NewProduct() {
  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [status, setStatus] = useState(true)
  const [imagemFile, setImagemFile] = useState(null)

  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  async function handleCreateProduct() {
    if (!nome || !preco || !quantidade || !imagemFile) {
      return alert("Preencha todos os campos e selecione uma imagem.")
    }

    try {
      const formData = new FormData()
      formData.append("imagem", imagemFile)

      const uploadResponse = await api.post("/upload_imagem", formData)
      const imagemUrl = uploadResponse.data.url

      await api.post("/cadastro_produto", {
        id_user: 1, // substitua pelo usuário logado
        nome,
        preco: parseFloat(preco),
        quantidade: parseInt(quantidade),
        status,
        imagem: imagemUrl
      })

      alert("Produto cadastrado com sucesso!")
      navigate("/")
    } catch (error) {
      console.error(error)
      alert("Erro ao cadastrar produto.")
    }
  }

  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Cadastrar Produto</h1>
            <ButtonText 
              title="Voltar"
              onClick={handleBack}
            />
          </header>

          <Input 
            placeholder="Nome do produto"
            onChange={e => setNome(e.target.value)}
          />

          <Input 
            placeholder="Preço (R$)"
            type="number"
            onChange={e => setPreco(e.target.value)}
          />

          <Input 
            placeholder="Quantidade"
            type="number"
            onChange={e => setQuantidade(e.target.value)}
          />

          <Section title="Imagem do produto">
            <Input 
              type="file"
              accept="image/*"
              onChange={e => setImagemFile(e.target.files[0])}
            />
          </Section>

          <Section title="Status">
            <label>
              <input
                type="checkbox"
                checked={status}
                onChange={() => setStatus(!status)}
              /> Ativo
            </label>
          </Section>

          <Button 
            title="Salvar produto"
            onClick={handleCreateProduct}
          />
        </Form>
      </main>
    </Container>
  )
}