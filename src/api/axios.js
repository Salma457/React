// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '29cf44b93ca83bf48d9356395476f7ad'
  }
});

export default api;