import styled from "styled-components"
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

export default function Subsc() {
    const { token, login, user } = useContext(AuthContext);
    const [plans, setPlans] = useState();
    const [creds, setCreds] = useState();
    const navigate = useNavigate();

    if (!user) {
        navigate('/');
    }

    useEffect(() => {
        try {
            const now = JSON.parse(localStorage.getItem("cred"));
            setCreds(now);
            login(now);
            console.log(now);
            getPlans();
            if (now.mermbership) {
                navigate('/home');
            }
            
        } catch (error) {
            console.log('Errouu (provavelmente não existe ainda):' + error);
        }
        
    }, []);

    function getPlans() {
        axios.get('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((resp) => {
            setPlans(resp.data)
        })
        .catch((error) => {
            console.log(error)
            if (error.response.status === 401) {
                alert('não autorizado');
                navigate('/');
            }
        });

    };

    const redirecId = (aid) => {
        navigate('/subscriptions/' + aid);
    }


    if (!plans) {
        return (
            <h1>Carregando</h1>
        )
    }
    return (
        <Subs>
            <h1>Escolha seu plano</h1>
            {plans.map((x) => {
                return (
                    <Caxo logo={x.image} price={x.price} id={x.id} fucn={redirecId} />
                )
            })}
        </Subs>
    )
}

const Subs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .caixo{
        width: 290px;
        height: 180px;

        background: #0E0E13;
        border: 3px solid #7E7E7E;
        border-radius: 12px;

        display: flex;
        justify-content: space-around;
        align-items: center;

        margin-bottom: 10px;
    }
    .caixo p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        
        color: #FFFFFF;
    }
`



function Caxo({ logo, price, id, fucn }) {
    return (
        <div onClick={() => fucn(id)} className="caixo">
            <img src={logo} alt="" />
            <p>R$ {price}</p>
        </div>
    )
}