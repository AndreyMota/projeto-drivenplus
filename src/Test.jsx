import axios from "axios"
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "./Context/AuthContext"


export default function Test() {
    const { token, login } = useContext(AuthContext);
    const [plans, setPlans] = useState();

    useEffect(() => {
        console.log('Entramos no useEffect')
        try {
            const now = JSON.parse(localStorage.getItem("cred"));
            login(now);
            
        } catch (error) {
            console.log(error);
        }
        
    }, []);    

    if (token) {
        console.log(token);
        axios.get('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships', {
            hearder: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((resp) => {
            setPlans(resp.data);
            console.log(resp.data);
        })
        .catch((error) => {
            console.log(error)
        });
    }
    return (
        <h1>Teste</h1>
    )
}