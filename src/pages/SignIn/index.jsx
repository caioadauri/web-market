import { useState } from "react";
import { Background, Container, Form } from "./styles";
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { useAuth } from "../../hooks/auth";

import { Link } from 'react-router-dom';

import { Input } from "../../components/input";
import { Button } from "../../components/Button";

export function SignIn() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const { signIn } = useAuth()

  function handleSignIn() {
    signIn({email, senha})
  }
 
  return(
    <Container>
      <Form>
        <h1>Web Market</h1>
        <p>Aplicação para gerenciar os seus produtos</p>

        <h2>Faça o seu login</h2>

        <Input 
        placeholder="E-mail"
        type="text"
        icon={ FiMail }
        onChange={e => setEmail(e.target.value)}
        />

        <Input 
        placeholder="Senha"
        type="password"
        icon={ FiLock }
        onChange={e => setSenha(e.target.value)}
        />

        <Button title="Entrar" onClick={handleSignIn}/>

        <Link to='/register'>
          Criar conta
        </Link>

      </Form>
      <Background />
    </Container>
  )
  
}