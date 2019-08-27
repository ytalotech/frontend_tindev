import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

//Ex: ReactDOM.render(<h1>Hello Word</h1>, document.getElementById('root'));
//geralmente a gente só executa essa linha uma vez
ReactDOM.render(<App />, document.getElementById('root')); // aqui diz que ira pegar o arquivo app e colocar dentro da div com id root la em index.html