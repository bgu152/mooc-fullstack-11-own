import axios from 'axios';
const baseUrl = process.env.NODE_ENV === 'development'?  'http://localhost:8080/api/login': '/api/login';

async function login(username: string, password: string) {
    return axios.post(baseUrl, { username, password });
}

export default login;
