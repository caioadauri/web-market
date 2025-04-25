import { useState } from "react";
import { Container, Form } from "./styles";
import { FiLogIn, FiMail, FiLock, FiUser, FiTrello, FiSmartphone } from 'react-icons/fi';

import { Link, useNavigate } from 'react-router-dom';

import { api } from "../../services/api"

import { Input } from "../../components/input";
import { Button } from "../../components/Button";

export function SignUp() {
  const [nome, setNome] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [email, setEmail] = useState("")
  const [celular, setCelular] = useState("")
  const [senha, setSenha] = useState("")

  const navigate = useNavigate()

  function handleSignUp() {
    if(!nome || !cnpj || !email || !celular || !senha) {
      return alert("Preencha todos os campos!")
    }

    api.post("/cadastro", { nome, cnpj, email, celular, senha })
    .then(() => {
      alert("Cadastro realizado com sucesso!")
      navigate("/active")
    }).catch(error => {
      if(error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possível cadastrar!")
      }
    })
  }

  return(
    <Container>
      <Form>
      <h1>Web Market</h1>
      <p>Aplicação para gerenciar os seus produtos.</p>

      <h2>Crie sua conta</h2>

        <Input 
        placeholder="Nome"
        type="text"
        icon={ FiUser }
        onChange={e => setNome(e.target.value)}
        />

        <Input 
        placeholder="CNPJ"
        type="text"
        icon={ FiTrello }
        onChange={e => setCnpj(e.target.value)}
        />

        <Input 
        placeholder="E-mail"
        type="text"
        icon={ FiMail }
        onChange={e => setEmail(e.target.value)}
        />

        <Input 
        placeholder="Celular"
        type="text"
        icon={ FiSmartphone }
        onChange={e => setCelular(e.target.value)}
        />

        <Input 
        placeholder="Senha"
        type="password"
        icon={ FiLock }
        onChange={e => setSenha(e.target.value)}
        />

        <Button title="Cadastrar" onClick={handleSignUp}/>

        <Link to='/'>
          Voltar para o login
        </Link>

      
      </Form>
    </Container>
  )

}