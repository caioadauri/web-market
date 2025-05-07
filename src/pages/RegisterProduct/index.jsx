import { useState } from "react";
import { Container } from "./styles";
import { FiDollarSign, FiBox, FiPaperclip, FiPackage } from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';

import { api } from "../../services/api";

import { Input } from "../../components/input";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";


export function RegisterProduct() {
    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState("")
    const [quantidade, setQuantidade] = useState("")
    const [status, setStatus] = useState("")
    const [imagem, setImagem] = useState("")

    const navigate = useNavigate()

    function handleRegisterProduct() {
        if (!nome || !preco || !quantidade || !imagem) {
            return alert("Preencha todos os campos!")
        }


        api.post("/cadastro_produto", { nome, preco, quantidade, status, imagem })
            .then(() => {
                alert("Cadastro realizado com sucesso!")
                navigate("/active")
            }).catch(error => {
                if (error.response) {
                    alert(error.response.data.message)
                } else {
                    alert("Não foi possível cadastrar!")
                }
            })
    }


    return (
        <Container>
            <Form>
                <h1>Web Market</h1>
                <p>Aplicação para gerenciar os seus produtos</p>

                <h2>Cadastre seu produto</h2>

                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiPackage}
                    onChange={e => setNome(e.target.value)}
                />

                <Input
                    placeholder="Preço"
                    type="number"
                    step="0.01"
                    min="0"
                    icon={FiDollarSign}
                    onChange={e => setPreco(e.target.value)}
                />

                <Input
                    placeholder="Quantidade"
                    type="number"
                    min="1"
                    icon={FiBox}
                    onChange={e => setQuantidade(e.target.value)}
                />

                <Input
                    placeholder="Imagem"
                    type="file"
                    accept="image/*"
                    icon={FiPaperclip}
                    onChange={e => setImagem(e.target.files[0])}
                />
                
                <Checkbox 
                    id="checkboxStatus"
                    label="Marque para ativar o produto"
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                />

                <Button title="Cadastrar" onClick={handleRegisterProduct} />

            </Form>
        </Container>
    )
}
