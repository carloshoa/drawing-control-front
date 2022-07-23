import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const login = async (formData) => {
  const response = await api.post('/auth/login', formData);

  return response.data;
};

export const register = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });

  return response;
};

export const getProjects = async (token) => {
  const response = await api.get('/projects', { headers: { Authorization: `Bearer ${token}` } });

  return response.data;
};
