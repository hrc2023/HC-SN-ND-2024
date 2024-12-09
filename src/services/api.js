import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Fetch user profile
export const getProfile = (token) =>
    API.get("/users/me", { headers: { Authorization: `Bearer ${token}` } });
  
  // Update user profile
export const updateProfile = (data, token) =>
    API.put("/users/me", data, { headers: { Authorization: `Bearer ${token}` } });

export const checkHealth = () => API.get('/health');
