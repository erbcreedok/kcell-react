import axios from 'axios';

export default axios.create({
    baseURL: `http://kcellapi.elefanto.kz/api/`,
    headers: {
        'Content-Type': 'application/json',
    }
});