//realizar chamada a api assim que nosso componente for exibido em tela
//toda vez que precisa ter uma variavel que vai ser manipulada pelo nosso componente
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
// serve para a gente criar uma ancora
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import itsamatch from '../assets/itsamatch.pnp';

//com esse match tenho todos os paramentros passado nessa rota
export default function Main({ match }) {
    //inicialiando a variavel users com um array vazio useState([])
    //função setUsers não preciso criar essa função
    //quando mudamos um estado ele faz toda uma rederização do html
    const [users, setUsers] = useState([]);

    //criar um estado para saber quando deu metch ou não
    const [matchDev, setMatchDev] = useState(true);

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

    //vai se conectar com nosso websocket, mas poderia ser tudo em uma useEffect
    useEffect(() => {

        //irei conectar com bakend atraveis da variavel socket
        //passo o ip do backend
        const socket = io('http://localhost:3333', {
            query: { user: match.params.id }
        });
        
        //irei ouvir
        socket.on('match', dev => {
            console.log(dev);
        });

        // //preciso ouvir do backend a mensagem
        // socket.on('world', message => {
        //     console.log(message);
        // })

        // setTimeout(() => {
        //     //estou emitindo para obackend uma menagem do tipo Hello. E possui um objeto com uma chave mesage e valor Hello Word
        //     socket.emit('hello', {
        //         message: 'Hello Word'
        //     })
        // }, 3000);
    }, [match.params.id]);
    //vai se cronixar toda vez que tiver um [match.params.id] diferente

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
                {/* se tiver alguma informação dentro de matchDev ele vai entrar */}
                { matchDev && (
                    <div className="match-containe">
                        <img src={itsamatch} alt="It´s a match" />
                        <img className="avatar" src="https://avatars1.githubusercontent.com/u/54129629?v=4" alt="" />
                        <strong>Ytalo Lopes</strong>
                        <p>CEO na Lopessoftec. Desenvolvedor web em PHP e aprendendo Javascript, reactJs, React Native, NodeJS,... Sempre em busca de novos conhecimentos.</p>

                        <button type="button">FECHAR</button>
                    </div>
                ) }
        </div>
    )
    // e temos que colocar o nome do parametro da rota
    // return <h1>{ match.params.id }</h1>
}