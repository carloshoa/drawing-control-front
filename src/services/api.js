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
  try {
    const response = await api.get(`/projects?name=${searchName}`, setHeaders(token));

    return response.data;
  } catch (error) {
    if (error.response.status === '401') {
      localStorage.removeItem('token');
      window.localStorage.href('/');
    }
    throw error;
  }
};

export const getOneProject = async (id, token) => {
  try {
    const response = await api.get(`/projects/${id}`, setHeaders(token));
    return response.data;
  } catch (error) {
    if (error.response.status === '401') {
      localStorage.removeItem('token');
      window.localStorage.href('/');
    }
    throw error;
  }
};

export const createProjectDrawing = async (id, body, token) => {
  try {
    const response = await api.post('/drawing/create', body, setHeaders(token));
    return response.data;
  } catch (error) {
    if (error.response.status === '401') {
      localStorage.removeItem('token');
      window.localStorage.href('/');
    }
    throw error;
  }
};