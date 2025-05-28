import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Input } from '../../components/input';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';
import { Container, Form } from "./styles";
import { api } from '../../services/api';

export function Edit() {
  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [status, setStatus] = useState(true)
  const [imagemFile, setImagemFile] = useState(null)
  const [imagemUrl, setImagemUrl] = useState("")

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      const response = await api.get(`/produtos/${id}`);
      const product = response.data;

      setNome(product.nome);
      setPreco(product.preco);
      setQuantidade(product.quantidade);
      setStatus(product.status);
      setImagemUrl(product.imagem);
    }

    fetchProduct();
  }, [id])

  function handleBack() {
    navigate(-1)
  }

  async function handleUpdateProduct() {
    if (!nome || !preco || !quantidade) {
      return alert("Preencha todos os campos.");
    }

    try {
      let finalImagem = imagemUrl;

      if (imagemFile) {
        const formData = new FormData();
        formData.append("imagem", imagemFile);

        const uploadResponse = await api.post("/upload_imagem", formData);
        finalImagem = uploadResponse.data.url;
      }

      await api.put(`/produtos/${id}`, {
        nome,
        preco: parseFloat(preco),
        quantidade: parseInt(quantidade),
        status,
        imagem: finalImagem
      })

      alert("Produto atualizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar produto.");
    }
  }

   return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Editar Produto</h1>
            <ButtonText 
              title="Voltar"
              onClick={handleBack}
            />
          </header>

          <Input 
            placeholder="Nome do produto"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />

          <Input 
            placeholder="Preço (R$)"
            type="number"
            value={preco}
            onChange={e => setPreco(e.target.value)}
          />

          <Input 
            placeholder="Quantidade"
            type="number"
            value={quantidade}
            onChange={e => setQuantidade(e.target.value)}
          />

          <Section title="Imagem do produto">
            <Input 
              type="file"
              accept="image/*"
              onChange={e => setImagemFile(e.target.files[0])}
            />
            {imagemUrl && (
              <img 
                src={`${api.defaults.baseURL}${imagemUrl}`} 
                alt="Imagem atual" 
                style={{ marginTop: '10px', width: '100px' }}
              />
            )}
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
            title="Salvar alterações"
            onClick={handleUpdateProduct}
          />
          
        </Form>
      </main>
    </Container>
   )
}