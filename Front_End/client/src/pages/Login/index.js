import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

import api from '../../services/api';

import JMJ_logo from '../../assets/JMJ_logo.jpg';
import padlock from '../../assets/padlock.png';

export default function Login(){ 

    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');

    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();
        const data = {
            username,
            password,
        };

        try{
            
            const resposta = await api.post('auth/signin', data);

            localStorage.setItem('username', username);
            localStorage.setItem('accessToken', resposta.data.token);

            navigate('/book');
        }catch(err){
            console.log(data);
            alert('As credenciais não conferem!');
        }
    };

    return(
        <div className="login-container">

            <section className="form">
                <img src={JMJ_logo} alt="Imagem_principal"/>
                
                <form onSubmit={login}>
                    <h1>
                        Acesse a sua conta
                    </h1>

                    <input 
                        placeholder="Login"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input 
                        type="password" placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    
                    <button className="button" type="submit">Login</button>
                </form>

            </section>
        
            <img src={padlock} alt="Login"/>
        
        </div>
    );


}