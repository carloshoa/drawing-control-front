import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const setHeaders = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const login = async (formData) => {
  const response = await api.post('/auth/login', formData);

  return response.data;
};

export const register = async (formData) => {
  const response = await api.post('/auth/register', formData);

  return response;
};

export const getProjects = async (searchName, token) => {
  const response = await api.get(`/projects?name=${searchName}`, setHeaders(token));

  return response.data;
};
