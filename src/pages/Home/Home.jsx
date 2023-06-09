import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import styled from "styled-components";
import { AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
    const { user, login, token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const how = JSON.parse(localStorage.getItem("cred"));
            login(how);
            console.log('Esse aqui é o user');
            console.log(how);
            
        } catch (error) {
            console.log('Errouu (provavelmente não existe ainda):' + error);
        }
        
    }, []);

    if (!user) {
        return (
            <h1>Carregando</h1>
        )
    }

    return (
        <HomeStyled>
            <div className="top">
                <img src={user.membership.image} alt="" />
                <AiOutlineUser />
            </div>
            <p>Olá, {user.name}</p>
            {user.membership.perks.map((x) => {
                return (
                    <button className="perk" onClick={() => window.location.href = x.link}>{x.title}</button>
                )
            })}
            <div className="crud">
                <button onClick={() => navigate('/subscriptions')} className="perk">Mudar Plano</button>
                <button onClick={() => {
                    axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then((resp) => {
                        navigate('/subscriptions')
                    })
                    .catch((error) => {
                        console.log(error)
                        if (error.response.status === 401) {
                            alert('não autorizado');
                            navigate('/');
                        }
                    });
                }} className="perk coor">Cancelar Plano</button>
            </div>
        </HomeStyled>
    )
}

const HomeStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .top {
        display: flex;
        justify-content: space-between;
        min-width: 350px;
    }
    p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        
        color: #FFFFFF;
        margin-bottom: 53px;        
    }
    .perk {
        width: 299px;
        height: 52px;
        
        background: #FF4791;
        border-radius: 8px;        
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 12px;


        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;

        color: #FFFFFF;
    }
    .coor {
        background-color: #FF4747;
    }
    .crud {
        position: fixed;
        bottom: 12px;
    }
`