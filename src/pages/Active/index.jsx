import { useState } from "react";
import { Container, Form } from "./styles";
import { FiLogIn, FiMail, FiLock, FiUser, FiTrello, FiSmartphone } from 'react-icons/fi';

import { Link, useNavigate } from 'react-router-dom';

import { api } from "../../services/api"

import { Input } from "../../components/input";
import { Button } from "../../components/Button";

export function Active() {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")

  const navigate = useNavigate()

  function handleActive() {
    if(!email || !code) {
      return alert("Insira o email e o código de ativação!")
    }

    api.post("/ativacao", {email, code})
    .then(() => {
      alert("Conta ativada com sucesso!")
      navigate("/")
    }).catch(error => {
      if(error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possível ativar a conta!")
      }
    })
  }

  return(
    <Container>
      <Form>
      <h1>Web Market</h1>
      <p>Aplicação para gerenciar os seus produtos.</p>

      <h2>Ative sua conta</h2>

        <Input 
        placeholder="E-mail"
        type="text"
        icon={ FiMail }
        onChange={e => setEmail(e.target.value)}
        />
        
        <Input 
        placeholder="Código de Ativação"
        type="text"
        icon={ FiLock }
        onChange={e => setCode(e.target.value)}
        />

        <Button title="Ativar" onClick={handleActive}/>

      </Form>
    </Container>
  )
}