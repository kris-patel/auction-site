import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const api = {
  // Auth
  register: (data) => axiosInstance.post('/auth/register', data),
  login: (email, password) => axiosInstance.post('/auth/login', { email, password }),

  // Auctions
  getAuctions: () => axiosInstance.get('/auctions/active'),
  getMyAuctions: () => axiosInstance.get('/auctions/mine'),
  createAuction: (data) => axiosInstance.post('/auctions', data),

  // Bids
  placeBid: (auctionId, amount) => axiosInstance.post(`/bids/${auctionId}`, { amount }),

  // Admin
  getUsers: () => axiosInstance.get('/admin/users').then(res => res.data),
  createRep: (data) => axiosInstance.post('/admin/create-rep', data).then(res => res.data),
  deleteUser: (userId) => axiosInstance.delete(`/admin/users/${userId}`),

  // Rep
  deleteAuction: (auctionId) => axiosInstance.delete(`/rep/auction/${auctionId}`)
};

export default api;
