// // // // // // import axios from 'axios';

// // // // // // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// // // // // // const axiosInstance = axios.create({
// // // // // //   baseURL: API_URL,
// // // // // //   headers: {
// // // // // //     'Content-Type': 'application/json'
// // // // // //   }
// // // // // // });

// // // // // // // Add token to requests
// // // // // // axiosInstance.interceptors.request.use((config) => {
// // // // // //   const token = localStorage.getItem('token');
// // // // // //   if (token) {
// // // // // //     config.headers.Authorization = `Bearer ${token}`;
// // // // // //   }
// // // // // //   return config;
// // // // // // });

// // // // // // const api = {
// // // // // //   // Auth
// // // // // //   register: (data) => axiosInstance.post('/auth/register', data),
// // // // // //   login: (email, password) => axiosInstance.post('/auth/login', { email, password }),

// // // // // //   // Auctions
// // // // // //   getAuctions: () => axiosInstance.get('/auctions/active'),
// // // // // //   getMyAuctions: () => axiosInstance.get('/auctions/mine').then(res => res.data),
// // // // // //   createAuction: (data) => axiosInstance.post('/auctions', data),

// // // // // //   // Bids
// // // // // //   placeBid: (auctionId, amount) => axiosInstance.post(`/bids/${auctionId}`, { amount }),

// // // // // //   // Admin
// // // // // //   getUsers: () => axiosInstance.get('/admin/users').then(res => res.data),
// // // // // //   createRep: (data) => axiosInstance.post('/admin/create-rep', data).then(res => res.data),
// // // // // //   deleteUser: (userId) => axiosInstance.delete(`/admin/users/${userId}`),

// // // // // //   // Rep
// // // // // //   deleteAuction: (auctionId) => axiosInstance.delete(`/rep/auction/${auctionId}`)
// // // // // // };

// // // // // // export default api;


// // // // // import axios from 'axios';

// // // // // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// // // // // const axiosInstance = axios.create({
// // // // //   baseURL: API_URL,
// // // // //   headers: {
// // // // //     'Content-Type': 'application/json'
// // // // //   }
// // // // // });

// // // // // // Add token to requests
// // // // // axiosInstance.interceptors.request.use((config) => {
// // // // //   const token = localStorage.getItem('token');
// // // // //   if (token) {
// // // // //     config.headers.Authorization = `Bearer ${token}`;
// // // // //   }
// // // // //   return config;
// // // // // });

// // // // // const api = {
// // // // //   // Auth
// // // // //   register: (data) => axiosInstance.post('/auth/register', data),
// // // // //   login: (email, password) => axiosInstance.post('/auth/login', { email, password }),

// // // // //   // Auctions
// // // // //   getAuctions: () => axiosInstance.get('/auctions/active').then(res => res.data.auctions),
// // // // //   getMyAuctions: () => axiosInstance.get('/auctions/seller/mine').then(res => res.data.auctions),
// // // // //   createAuction: (data) => axiosInstance.post('/auctions', data),

// // // // //   // Bids
// // // // //   placeBid: (auctionId, buyerId, amount) => axiosInstance.post(`/bids/${auctionId}`, { bidAmount: amount }),

// // // // //   // Admin
// // // // //   getUsers: () => axiosInstance.get('/admin/users').then(res => res.data),
// // // // //   createRep: (data) => axiosInstance.post('/admin/create-rep', data).then(res => res.data),
// // // // //   deleteUser: (userId) => axiosInstance.delete(`/admin/users/${userId}`),

// // // // //   // Rep
// // // // //   getRepUsers: () => axiosInstance.get('/rep/users').then(res => res.data.users),
// // // // //   getRepAuctions: () => axiosInstance.get('/admin/auctions').then(res => res.data.auctions),
// // // // //   deleteAuction: (auctionId) => axiosInstance.delete(`/rep/auction/${auctionId}`)
// // // // // };

// // // // // export default api;

// // // // import axios from 'axios';

// // // // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// // // // const axiosInstance = axios.create({
// // // //   baseURL: API_URL,
// // // //   headers: {
// // // //     'Content-Type': 'application/json'
// // // //   }
// // // // });

// // // // // Add token to requests
// // // // axiosInstance.interceptors.request.use((config) => {
// // // //   const token = localStorage.getItem('token');
// // // //   if (token) {
// // // //     config.headers.Authorization = `Bearer ${token}`;
// // // //   }
// // // //   return config;
// // // // });

// // // // const api = {
// // // //   // Auth
// // // //   register: (data) => axiosInstance.post('/auth/register', data),
// // // //   login: (email, password) => axiosInstance.post('/auth/login', { email, password }),

// // // //   // Auctions
// // // //   getAuctions: () => axiosInstance.get('/auctions/active').then(res => res.data.auctions),
// // // //   getMyAuctions: () => axiosInstance.get('/auctions/seller/mine').then(res => res.data.auctions),
// // // //   createAuction: (data) => axiosInstance.post('/auctions', data),

// // // //   // Bids
// // // //   placeBid: (auctionId, buyerId, amount) => axiosInstance.post(`/bids/${auctionId}`, { bidAmount: amount }),

// // // //   // Admin
// // // //   getUsers: () => axiosInstance.get('/admin/users').then(res => res.data),
// // // //   createRep: (data) => axiosInstance.post('/admin/create-rep', data).then(res => res.data),
// // // //   deleteUser: (userId) => axiosInstance.delete(`/admin/users/${userId}`),

// // // //   // Rep
// // // //   getRepUsers: () => axiosInstance.get('/rep/users').then(res => res.data.users),
// // // //   getRepAuctions: () => axiosInstance.get('/rep/auctions').then(res => res.data.auctions),
// // // //   deleteAuction: (auctionId) => axiosInstance.delete(`/rep/auction/${auctionId}`)
// // // // };

// // // // export default api;

// // // import axios from 'axios';

// // // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// // // const axiosInstance = axios.create({
// // //   baseURL: API_URL,
// // //   headers: {
// // //     'Content-Type': 'application/json'
// // //   }
// // // });

// // // // Add token to requests
// // // axiosInstance.interceptors.request.use((config) => {
// // //   const token = localStorage.getItem('token');
// // //   if (token) {
// // //     config.headers.Authorization = `Bearer ${token}`;
// // //   }
// // //   return config;
// // // });

// // // const api = {
// // //   // Auth
// // //   register: (data) => axiosInstance.post('/auth/register', data),
// // //   login: (email, password) => axiosInstance.post('/auth/login', { email, password }),

// // //   // Auctions
// // //   getAuctions: () => axiosInstance.get('/auctions/active').then(res => res.data.auctions),
// // //   getMyAuctions: () => axiosInstance.get('/auctions/seller/mine').then(res => res.data.auctions),
// // //   createAuction: (data) => axiosInstance.post('/auctions', data),

// // //   // Bids
// // //   placeBid: (auctionId, amount) => axiosInstance.post(`/bids/${auctionId}`, { bidAmount: amount }),

// // //   // Admin
// // //   getUsers: () => axiosInstance.get('/admin/users').then(res => res.data),
// // //   createRep: (data) => axiosInstance.post('/admin/create-rep', data).then(res => res.data),
// // //   deleteUser: (userId) => axiosInstance.delete(`/admin/users/${userId}`),

// // //   // Rep
// // //   getRepUsers: () => axiosInstance.get('/rep/users').then(res => res.data.users),
// // //   getRepAuctions: () => axiosInstance.get('/rep/auctions').then(res => res.data.auctions),
// // //   deleteAuction: (auctionId) => axiosInstance.delete(`/rep/auction/${auctionId}`)
// // // };

// // // export default api;

// // import axios from 'axios';

// // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// // const axiosInstance = axios.create({
// //   baseURL: API_URL,
// //   headers: {
// //     'Content-Type': 'application/json'
// //   }
// // });

// // // Add token to requests
// // axiosInstance.interceptors.request.use((config) => {
// //   const token = localStorage.getItem('token');
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// // const api = {
// //   // Auth
// //   register: (data) => axiosInstance.post('/auth/register', data),
// //   login: (email, password) => axiosInstance.post('/auth/login', { email, password }),

// //   // Auctions
// //   getAuctions: () => axiosInstance.get('/auctions/active').then(res => res.data.auctions),
// //   getMyAuctions: () => axiosInstance.get('/auctions/seller/mine').then(res => res.data.auctions),
// //   createAuction: (data) => axiosInstance.post('/auctions', data),

// //   // Bids
// //   placeBid: (auctionId, amount) => axiosInstance.post(`/bids/${auctionId}`, { bidAmount: amount }),
// //   getAuctionBids: (auctionId) => axiosInstance.get(`/bids/${auctionId}`).then(res => res.data.bids),

// //   // Admin
// //   getUsers: () => axiosInstance.get('/admin/users').then(res => res.data),
// //   createRep: (data) => axiosInstance.post('/admin/create-rep', data).then(res => res.data),
// //   deleteUser: (userId) => axiosInstance.delete(`/admin/users/${userId}`),

// //   // Rep
// //   getRepUsers: () => axiosInstance.get('/rep/users').then(res => res.data.users),
// //   getRepAuctions: () => axiosInstance.get('/rep/auctions').then(res => res.data.auctions),
// //   deleteAuction: (auctionId) => axiosInstance.delete(`/rep/auction/${auctionId}`)
// // };

// // export default api;

// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Add token to requests
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// const api = {
//   // Auth
//   register: (data) => axiosInstance.post('/auth/register', data),
//   login: (email, password) => axiosInstance.post('/auth/login', { email, password }),

//   // Auctions
//   // getAuctions: () => axiosInstance.get('/auctions/active').then(res => res.data.auctions),
//   // getAuctionDetail: (auctionId) => axiosInstance.get(`/auctions/${auctionId}`).then(res => res.data.auction),
//   // getMyAuctions: () => axiosInstance.get('/auctions/seller/mine').then(res => res.data.auctions),
//   // createAuction: (data) => axiosInstance.post('/auctions', data),

//   getAuctions: () => axiosInstance.get('/auctions/active').then(res => res.data.auctions),
//   getAuctionDetail: (auctionId) => axiosInstance.get(`/auctions/${auctionId}`).then(res => res.data.auction),
//   getMyAuctions: () => axiosInstance.get('/auctions/seller/mine').then(res => res.data.auctions),
//   createAuction: (data) => axiosInstance.post('/auctions', data).then(res => res.data), // Return full response

//   // Bids
//   placeBid: (auctionId, amount) => axiosInstance.post(`/bids/${auctionId}`, { bidAmount: amount }),
//   getAuctionBids: (auctionId) => axiosInstance.get(`/bids/${auctionId}`).then(res => res.data.bids),
//   getMyBids: () => axiosInstance.get('/bids/my-bids').then(res => res.data.bids),

//   // Admin
//   getUsers: () => axiosInstance.get('/admin/users').then(res => res.data),
//   createRep: (data) => axiosInstance.post('/admin/create-rep', data).then(res => res.data),
//   deleteUser: (userId) => axiosInstance.delete(`/admin/users/${userId}`),

//   // Rep
//   getRepUsers: () => axiosInstance.get('/rep/users').then(res => res.data.users),
//   getRepAuctions: () => axiosInstance.get('/rep/auctions').then(res => res.data.auctions),
//   deleteAuction: (auctionId) => axiosInstance.delete(`/rep/auction/${auctionId}`),

// //   uploadProfileImage: (imageFile) => {
// //     const formData = new FormData();
// //     formData.append('image', imageFile);
// //     return axiosInstance.post('/upload/profile', formData, {
// //       headers: { 'Content-Type': 'multipart/form-data' }
// //     });
// //   },

// //   uploadAuctionImages: (auctionId, imageFiles) => {
// //     const formData = new FormData();
// //     formData.append('auctionId', auctionId);
// //     imageFiles.forEach(file => {
// //       formData.append('images', file);
// //     });
// //     return axiosInstance.post('/upload/auction', formData, {
// //       headers: { 'Content-Type': 'multipart/form-data' }
// //     });
// //   },

// //   deleteAuctionImage: (imageId) => 
// //     axiosInstance.delete(`/upload/auction/${imageId}`),

// //   setPrimaryImage: (imageId) => 
// //     axiosInstance.patch(`/upload/auction/${imageId}/primary`)

// // };
// uploadProfileImage: (imageFile) => {
//     const formData = new FormData();
//     formData.append('image', imageFile);
//     return axiosInstance.post('/upload/profile', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }).then(res => res.data);
//   },

//   uploadAuctionImages: (auctionId, imageFiles) => {
//     const formData = new FormData();
//     formData.append('auctionId', auctionId);
    
//     // Handle both single file and array of files
//     const files = Array.isArray(imageFiles) ? imageFiles : [imageFiles];
//     files.forEach(file => {
//       formData.append('images', file);
//     });
    
//     return axiosInstance.post('/upload/auction', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }).then(res => res.data);
//   },

//   deleteAuctionImage: (imageId) => 
//     axiosInstance.delete(`/upload/auction/${imageId}`).then(res => res.data),

//   setPrimaryImage: (imageId) => 
//     axiosInstance.patch(`/upload/auction/${imageId}/primary`).then(res => res.data)
// };

// export default api;

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
  // getAuctions: () => axiosInstance.get('/auctions/active').then(res => res.data.auctions),
  getAuctionDetail: (auctionId) => axiosInstance.get(`/auctions/${auctionId}`).then(res => res.data.auction),
  // getMyAuctions: () => axiosInstance.get('/auctions/seller/mine').then(res => res.data.auctions),
  createAuction: (data) => axiosInstance.post('/auctions', data).then(res => res.data),

  getAuctionsByStatus : async (status) => {
  const response = await axiosInstance.get(`/auctions/by-status?status=${status}`);
  return response.data.auctions;
},

// Get seller's auctions with status filter
  getMyAuctionsByStatus: async (status) => {
  const response = await axiosInstance.get(`/auctions/seller/mine?status=${status}`);
  return response.data.auctions;
},

// Update existing getMyAuctions to support filtering
getMyAuctions : async (status = null) => {
  const url = status 
    ? `/auctions/seller/mine?status=${status}`
    : '/auctions/seller/mine';
  const response = await axiosInstance.get(url);
  return response.data.auctions;
},

// Update existing getAuctions to support filtering
getAuctions : async (status = 'active') => {
  const url = status === 'active' 
    ? '/auctions/active'
    : `/auctions/by-status?status=${status}`;
  const response = await axiosInstance.get(url);
  return response.data.auctions;
},

  // Bids
  placeBid: (auctionId, amount) => axiosInstance.post(`/bids/${auctionId}`, { bidAmount: amount }),
  getAuctionBids: (auctionId) => axiosInstance.get(`/bids/${auctionId}`).then(res => res.data.bids),
  getMyBids: () => axiosInstance.get('/bids/my-bids').then(res => res.data.bids),

  // Admin
  getUsers: () => axiosInstance.get('/admin/users').then(res => res.data),
  createRep: (data) => axiosInstance.post('/admin/create-rep', data).then(res => res.data),
  deleteUser: (userId) => axiosInstance.delete(`/admin/users/${userId}`),

  // Rep
  getRepUsers: () => axiosInstance.get('/rep/users').then(res => res.data.users),
  getRepAuctions: () => axiosInstance.get('/rep/auctions').then(res => res.data.auctions),
  deleteAuction: (auctionId) => axiosInstance.delete(`/rep/auction/${auctionId}`),

  // Image Upload
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
    
    // Handle both single file and array of files
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

  updateAuction: (auctionId, data) => 
    axiosInstance.put(`/auctions/${auctionId}`, data).then(res => res.data),

  // NEW: Rep approval endpoints
  approveAuction: (auctionId, approved) => 
    axiosInstance.post(`/rep/auction/${auctionId}/approve`, { approved }).then(res => res.data),

  updateAuctionStatus: (auctionId, status) => 
    axiosInstance.patch(`/rep/auction/${auctionId}/status`, { status }).then(res => res.data),

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