import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isUserLogged, Page }) => (
  isUserLogged ? <Page /> : <Navigate to="/" />
);

export default ProtectedRoute;
