import React from 'react';

import logo from '../assets/logo.svg';

//com esse match tenho todos os paramentros passado nessa rota
export default function Main({ match }) {
    return (
        <div className="main-container">
            <img src={logo} alt="Tindev" />
        <ul>
            <li>
                <img src="https://avatars2.githubusercontent.com/u/2254731?v=4" alt="" />
                <footer>
                    <strong>Diego Fernandes</strong>
                    <p>Desenvolvedor Rocketseat</p>
                </footer>
                <div className="buttons">
                    <button type=""></button>
                </div>
            </li>
        </ul>
        </div>
    )
    // e temos que colocar o nome do parametro da rota
    // return <h1>{ match.params.id }</h1>
}