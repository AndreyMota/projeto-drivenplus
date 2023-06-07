import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";


export default function Singup() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    function handleSet(event, setf) {
        setf(event.target.value);
        console.log(event.target.value);
    }
    /* {
        email: "fulano@email.com",
        name: "Fulano",
        cpf: "111.111.111-11",
        password: "123"
    } */

    /*
    CREDENCIAIS TESTE
     nome: juju
    cpf: 123.456.789.90
    email: juju@gmail.com
    senha: jumentinho
    */

    function sign() {
        event.preventDefault();
        let obj = {}
        if (nome && cpf && email && pass) {
            console.log('first if');
            obj = {
                email: email,
                name: nome,
                cpf: cpf,
                password: pass
            }       
        }
        if (obj) {
            console.log(obj);
            console.log('second if');
            axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up', obj)
            .then((resp) => {
                console.log(resp);
                navigate('/');
            })
            .catch((er) => {
                console.log(er);
                alert('Deu errado aqui meu patrão: ' + er);
            });
        }
        
    }



    return (
        <Sing>
            <h1>Singup</h1>
            <Campos>
                <form>
                    <input placeholder="nome" value={nome} onChange={() => handleSet(event, setNome)} type="text" /> 
                    <input placeholder="cpf" value={cpf} onChange={() => handleSet(event, setCpf)} type="text" /> 
                    <input placeholder="email" value={email} onChange={() => handleSet(event, setEmail)} type="email" /> 
                    <input placeholder="senha" value={pass} onChange={() => handleSet(event, setPass)} type="password" /> 
                    <button onClick={sign}>Cadastrar</button>
                </form>
                <Link className="link" to={'/'}>Já possui uma conta? entre</Link>
            </Campos>
        </Sing>

    )
}

const Sing = styled.div`
    width: 1005;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Campos = styled.div`
    margin: 0, auto;

    form {
        display: flex;
        flex-direction: column;
    }
    input {
        width: 299px;
        height: 52px;
        border-radius: 8px;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 16px;

        color: #7E7E7E;

    }
    button {
        width: 299px;
        height: 52px;    
        margin-top: 24px; 
        margin-bottom: 24px; 
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 18px 122px;
        gap: 10px;
        
        background: #FF4791;
        border-radius: 8px;        
    }

    .link {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-decoration-line: underline;
        
        color: #FFFFFF;
                
    }
`