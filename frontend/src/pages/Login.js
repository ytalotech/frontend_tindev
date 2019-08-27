import React, { useState } from 'react';
import './Login.css';

import logo from '../assets/logo.svg';

export default function Login() {
    // pegar valor do input
    //se eu fosse inicializar inout com algum valor eu colocaria aqui onde tem as aspas: userState('');
    const [username, setUsername] = useState('');
    
    // função que vai ser disparada quando um usuário der um submit
    // 'e' de evento
    function handleSubmit(e){
        // aqui ele vai previnir o comportamento padrõa de um formulario que é enviar para outra página
        e.preventDefault();

        console.log(username);
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