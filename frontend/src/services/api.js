/**
 * ============================================
 * api.js
 * ============================================
 * Centralized API service layer
 * Handles all HTTP requests to backend
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token to all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const api = {
  // Authentication endpoints
  register: (data) => axiosInstance.post('/auth/register', data),
  login: (email, password) => axiosInstance.post('/auth/login', { email, password }),

  // Auction endpoints
  getAuctionDetail: (auctionId) => axiosInstance.get(`/auctions/${auctionId}`).then(res => res.data.auction),
  createAuction: (data) => axiosInstance.post('/auctions', data).then(res => res.data),
  
  getAuctionsByStatus: async (status) => {
    const response = await axiosInstance.get(`/auctions/by-status?status=${status}`);
    return response.data.auctions;
  },

  getMyAuctionsByStatus: async (status) => {
    const response = await axiosInstance.get(`/auctions/seller/mine?status=${status}`);
    return response.data.auctions;
  },

  getMyAuctions: async (status = null) => {
    const url = status 
      ? `/auctions/seller/mine?status=${status}`
      : '/auctions/seller/mine';
    const response = await axiosInstance.get(url);
    return response.data.auctions;
  },

  getAuctions: async (status = 'active') => {
    const url = status === 'active' 
      ? '/auctions/active'
      : `/auctions/by-status?status=${status}`;
    const response = await axiosInstance.get(url);
    return response.data.auctions;
  },

  // Bid endpoints
  placeBid: (auctionId, amount) => axiosInstance.post(`/bids/${auctionId}`, { bidAmount: amount }),
  getAuctionBids: (auctionId) => axiosInstance.get(`/bids/${auctionId}`).then(res => res.data.bids),
  getMyBids: () => axiosInstance.get('/bids/my-bids').then(res => res.data.bids),

  // Admin endpoints
  getUsers: () => axiosInstance.get('/admin/users').then(res => res.data),
  createRep: (data) => axiosInstance.post('/admin/create-rep', data).then(res => res.data),
  deleteUser: (userId) => axiosInstance.delete(`/admin/users/${userId}`),

  // Representative endpoints
  getRepUsers: () => axiosInstance.get('/rep/users').then(res => res.data.users),
  getRepAuctions: () => axiosInstance.get('/rep/auctions').then(res => res.data.auctions),
  
  // Delete auction (unified endpoint for sellers and reps)
  deleteAuction: (auctionId) => axiosInstance.delete(`/auctions/${auctionId}`),

  // Image upload endpoints
  uploadProfileImage: (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    return axiosInstance.post('/upload/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  },

  uploadAuctionImages: (auctionId, imageFiles) => {
    const formData = new FormData();
    formData.append('auctionId', auctionId);
    
    const files = Array.isArray(imageFiles) ? imageFiles : [imageFiles];
    files.forEach(file => {
      formData.append('images', file);
    });
    
    return axiosInstance.post('/upload/auction', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  },

  deleteAuctionImage: (imageId) => 
    axiosInstance.delete(`/upload/auction/${imageId}`).then(res => res.data),

  setPrimaryImage: (imageId) => 
    axiosInstance.patch(`/upload/auction/${imageId}/primary`).then(res => res.data),

  // Auction management
  updateAuction: (auctionId, data) => 
    axiosInstance.put(`/auctions/${auctionId}`, data).then(res => res.data),

  approveAuction: (auctionId, approved) => 
    axiosInstance.post(`/rep/auction/${auctionId}/approve`, { approved }).then(res => res.data),

  updateAuctionStatus: (auctionId, status) => 
    axiosInstance.patch(`/rep/auction/${auctionId}/status`, { status }).then(res => res.data),

  // Profile update endpoints
  updateProfileImage: (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    return axiosInstance.put('/auth/profile/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  },

  updateUsername: (username) => {
    return axiosInstance.put('/auth/profile/username', { username })
      .then(res => res.data);
  },

  updatePassword: (currentPassword, newPassword) => {
    return axiosInstance.put('/auth/profile/password', {
      currentPassword,
      newPassword
    }).then(res => res.data);
  },

};

export default api;