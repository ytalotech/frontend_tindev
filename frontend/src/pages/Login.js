import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Login({ history }) {
    // pegar valor do input
    //se eu fosse inicializar inout com algum valor eu colocaria aqui onde tem as aspas: userState('');
    const [username, setUsername] = useState('');
    
    // função que vai ser disparada quando um usuário der um submit
    // 'e' de evento
    async function handleSubmit(e){
        // aqui ele vai previnir o comportamento padrõa de um formulario que é enviar para outra página
        e.preventDefault();

        // irei utilizar post pos a nossa api utiliza o metodo post
        const response = await api.post('/devs', {
            //como minha variavel tem o valor username tambem então posso usar só username ao inves de username: username
            username,
        });
        
        const { _id } = response.data;

        history.push(`/dev/${_id}`);
    }
    
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                {/* as chaves identifica que quero colocar codigos js */}
                <img src={logo} alt="Tindev" ></img>
                <input 
                    placeholder="Digite seu usuário no Github" 
                    value={username}
                    onChange={e => setUsername(e.target.value)} //é disparado toda vez que ouver altração no input
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}