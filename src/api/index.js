import axios from 'axios';

const API_URL = 'https://restaurantmanagementbackend-yxcf.onrender.com'; // Adjust the URL if your backend runs on a different port

const api = axios.create({
  baseURL: API_URL,
});

export default api;
