import axios from 'axios';

const api = axios.create({
    //vamos definir a base da url para não ficar sempre a chamando
    //o endereço tem que esta igual e aporta tambem igual a do node
    baseURL: 'http://localhost:3333'
});

export default api;