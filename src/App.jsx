import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';

import './App.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);

export default App;
