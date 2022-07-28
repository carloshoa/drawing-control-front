import React, { useState } from 'react';

import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';

import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import MyProjects from './components/pages/MyProjects/MyProjects';

import ProtectedRoute from './components/Miscelaneous/ProtectedRoute/ProtectedRoute';

import './App.css';

const App = () => {
  const verifyLoggedUser = () => {
    const token = localStorage.getItem('token');

    return !!token;
  };
  const [isUserLogged, setIsUserLogged] = useState(verifyLoggedUser());

  const loginUser = () => {
    setIsUserLogged(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login loginUser={loginUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/my-projects"
          element={<ProtectedRoute isUserLogged={isUserLogged} Page={MyProjects} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
