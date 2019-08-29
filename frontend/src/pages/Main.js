//realizar chamada a api assim que nosso componente for exibido em tela
//toda vez que precisa ter uma variavel que vai ser manipulada pelo nosso componente
import React, { useEffect, useState } from 'react';
// serve para a gente criar uma ancora
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';

//com esse match tenho todos os paramentros passado nessa rota
export default function Main({ match }) {
    //inicialiando a variavel users com um array vazio useState([])
    //função setUsers não preciso criar essa função
    //quando mudamos um estado ele faz toda uma rederização do html
    const [users, setUsers] = useState([]);

    //primeira parte é qual função quer executar e a segunda parte é quando irei executar
    //posso passar variaveis dentro do array e toda vez que nossa função for alterada será chamado novamente o useEffect
    // se eu passar um array vazio a função só será executada uma vez dentro do componente
    //toda vez que o id for alterado iremos chamar essa função de novo
    useEffect(() => {
        //criando uma outra função dentro da useEffect
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            });
            setUsers(response.data);
        }

        loadUsers();
    }, [match.params.id]);

    //função reposnavel pelo like
    //toda função que é gerada a apartir de uma interação com usario ele utiliza o handle...
    async function handleLike(id){
        await api.post(`/devs/${ id }/likes`, null, {
            headers: { user: match.params.id },
        });

        setUsers(users.filter(user => user._id !== id));
    }
    async function handleDislike(id){
        await api.post(`/devs/${ id }/dislikes`, null, {
            headers: { user: match.params.id },
        });

        // temos que atualizar a página apos realizar o dislike
        // semore tenho que sobrescrever o valor da variavel users utilizando o setUsers
        setUsers(users.filter(user => user._id !== id));
    }

    return (
        <div className="main-container">
            {/* to representa qual rota quero colocar aqui */}
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>
                {/* aqui possui um if */}
                { users.length > 0 ? (
                    <ul>
                        {/* map serve para percorrer um array */}
                        {/* retorno user => ( */}
                        {users.map(user => (
                            <li key={user._id}>
                                <img src={user.avatar} alt={user.name} />
                                <footer>
                                    <strong>{user.name}</strong>
                                    <p>{user.bio}</p>
                                </footer>
                                <div className="buttons">
                                    {/* assim que atualiza a pagina ele ja chama a função do onclick entao temos que criar outra função para da certo */}
                                    <button type="button" onClick={() => handleDislike(user._id)}>
                                        <img src={dislike} alt="Dislike" />
                                    </button>
                                    <button type="button" onClick={() => handleLike(user._id)}>
                                        <img src={like} alt="Like" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty">Acabou :(</div>
                ) }
        </div>
    )
    // e temos que colocar o nome do parametro da rota
    // return <h1>{ match.params.id }</h1>
}