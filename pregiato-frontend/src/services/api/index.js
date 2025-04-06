import axios from 'axios';

const api = axios.create({
  baseURL: 'https://projetopregiatoapi-production.up.railway.app',
});

export default api;
