import styled from "styled-components"
import logohome from './logo-home.png';
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";


export default function Login() {
    const { login, user } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [creds, setCreds] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Entramos no useEffect')
        try {
            const now = JSON.parse(localStorage.getItem("cred"));
            setCreds(now);
            console.log(now)
            console.log('creeds 2, ainda não assisti pô');
            login(now);
            if (now.mermbership === null) {
                navigate('/subscriptions');
            } else {
                navigate('/home');
            }
            
            
        } catch (error) {
            console.log('Errouu (provavelmente não existe ainda):' + error);
        }
        
    }, []);
    

    

    function handleSet(event, setf) {
        setf(event.target.value);
        console.log(event.target.value);
    }

    function sign() {
        event.preventDefault();
        let obj = {}
        if (email && pass) {
            console.log('first if');
            obj = {
                email: email,
                password: pass
            }       
        }
        if (obj) {
            console.log(obj);
            console.log('second if');
            axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', obj)
            .then((resp) => {
                console.log(resp);
                const credenciaisSerializadas = JSON.stringify(resp.data);
                localStorage.setItem("cred", credenciaisSerializadas);
                login(resp.data);
                if (resp.data.mermbership === null) {
                    navigate('/subscriptions');
                } else {
                    navigate('/home');
                }
            })
            .catch((er) => {
                console.log(er);
                alert('Deu errado aqui meu patrão: ' + er);
            });
        }
        
    }


    return (
        <Log>
            <h1>Login</h1>
            <img src={logohome} alt="" />
            <Campos>
                <form onSubmit={sign}>
                    <input value={email} onChange={() => handleSet(event, setEmail)} placeholder="E-mail" type="email" />
                    <input value={pass} onChange={() => handleSet(event, setPass)} placeholder="Senha"  type="password" /> 
                    <button>Entrar</button>
                </form>
                <Link className="link" to={'/sign-up'}>Não possui uma conta? Registre-se</Link>
            </Campos>
        </Log>
    )
}

const Log = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        width: 299px;
        height: 49px;
        margin-bottom: 100px;
    }
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