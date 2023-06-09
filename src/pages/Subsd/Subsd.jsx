import { useParams, useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext";
import { useState, useEffect, useContext } from "react";

import axios from "axios";
import styled from "styled-components";
import Modal from "../Modal/Modal";

import { FaClipboardList, FaMoneyBillWave } from "react-icons/fa";

export default function Subsd() {
    const params = useParams();
    const { token, login, user } = useContext(AuthContext);
    const [plan, setPlan] = useState();
    const [creds, setCreds] = useState();
    const [nome, setNome] = useState('');
    const [num, setNum] = useState('');
    const [cvv, setCvv] = useState('');
    const [val, setVal] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };    

    function handleSet(event, setf) {
        setf(event.target.value);
        console.log(event.target.value);
    }

    const navigate = useNavigate();

    useEffect(() => {
        try {
            const now = JSON.parse(localStorage.getItem("cred"));
            setCreds(now);
            login(now);
            console.log(now);
            getPlan();
            if (now.mermbership) {
                navigate('/home');
            }
            
        } catch (error) {
            console.log('Errouu (provavelmente não existe ainda):' + error);
        }
        
    }, []);

    function getPlan() {
        axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((resp) => {
            setPlan(resp.data);
            console.log(resp.data);
        })
        .catch((error) => {
            console.log(error)
            if (error.response.status === 401) {
                alert('não autorizado');
                navigate('/');
            }
        });

    };

    function sign() {
        event.preventDefault();
        let obj = {}
        obj = {
            email: user.email,
            password: user.password
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
                alert('Acaba de logar e salvar credenciais');
                navigate('/home');
            })
            .catch((er) => {
                console.log(er);
                alert('Deu errado aqui meu patrão: ' + er);
            });
        }
        
    }


    function selecionaPlan(event) {
        if (!user) {
            alert('não está logado');
            navigate('/');
        }
    

        event.preventDefault();
        if (!nome || !num || !cvv || !val) {
            return
        }
        const obj = {
            membershipId: `${params.id}`,
            cardName: nome,
            cardNumber: num,
            securityNumber: cvv,
            expirationDate: val
        }
        if (obj) {
            axios.post(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((resp) => {
                console.log(resp.data);
                const dadosHomeSer = JSON.stringify(resp.data);
                localStorage.setItem("home", dadosHomeSer);
                sign();
            })
            .catch((error) => {
                console.log(error)
                alert('Erro ao assinar');
                if (error.response.status === 401) {
                    alert('não autorizado');
                    navigate('/');
                }
            });
        }

    };
    
    if (!plan) {
        return (
            <h1>Carregando</h1>
        )
    }

    return (
        <Plano>
            <div className="bt">
                <Link className="buto" to={'/subscriptions'}>{'<<<'}</Link>
            </div>
            <img className="logo-plan" src={plan.image} />
            <p className="dvp">Driven Plus</p>

            <div className="info">
                <FaClipboardList className="icon" />  Benefícios:
                <br />
                <ol className="list" type="1">
                    <li>Brindes exclusivos</li>
                    <li>Materiais bônus de web</li>
                </ol>
            </div>
            
            <div className="info">
                <FaMoneyBillWave className="icon" />  Preço:
                <br />
                <p>R$ {plan.price.replace('.', ',')} cobrados mensalmente</p>
            </div>
            
            <form className="efe">
                <input value={nome} onChange={() => handleSet(event, setNome)} placeholder="Nome impresso no cartão" className="inp" type="text" />
                <input value={num} onChange={() => handleSet(event, setNum)} placeholder="Digitos do cartão" className="inp" type="text" /> 
                <div className="irow">
                    <input value={cvv} onChange={() => handleSet(event, setCvv)} placeholder="Código de segurança" className="inp inp-two" type="number" />
                    <input value={val} onChange={() => handleSet(event, setVal)} placeholder="Válidade" className="inp inp-two" type="text" />
                </div>
                <button onClick={selecionaPlan} className="ass">Assinar</button>
            </form>
            {/* <Modal isOpen={isModalOpen} onClose={closeModal} title="Meu Modal">
                <p>Tem certeza que deseja assinar esse plano?
                    {plan.name} {`(R$` + plan.price.replace('.', ',') + `)?`}
                </p>
                <button onClick={selecionaPlan}>Sim</button>
                <button onClick={closeModal}>Não</button>
            </Modal> */}
            


        </Plano>
    )
}

const Plano = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;    

    .bt {
        width: 100%;
        display: flex;
        justify-content: left;
        margin-bottom: 39px;
    }
    .buto {
        color: white;
        font-size: 28px;
        font-style: normal;
    }
    .logo-plan {
        width: 140px;
        height: 95px;
    }
    .dvp {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        /* identical to box height */
        
        
        color: #FFFFFF;
        
    }

    .info {
        min-width: 300px;
        max-width: 500px;
        display: flex;
        justify-content: left;

        margin-bottom: 32px;
        
    }
    .info span {
        display: flex;
        justify-content: left;
    }
    .icon {
        color: #FF4791;
        width: 12px;
        height: 16px;
        margin-right: 5px;
    }
    .txt {
        
        
        color: #FFFFFF;        
    }
    .list {
        display: flex;
        flex-direction: column;
        align-items: left;
    }

    .inp {
        width: 299px;
        height: 52px;
        background: #FFFFFF;
        border-radius: 8px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        
        color: #7E7E7E;
        
        margin-bottom: 12px;
    }
    .irow {
        display: flex;
    }
    .inp-two {
        max-width: 145px;
        margin-right: 9px;
    }
    .efe {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .ass {
        width: 299px;
        height: 52px;

        background: #FF4791;
        border-radius: 8px;
    }

`