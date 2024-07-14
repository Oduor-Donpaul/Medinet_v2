import { Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
    let { user } = useContext(AuthContext)

    console.log("PrivateRoute - User:", user); // Debug log

    return !user ? <Navigate to="/login"/> : children;
}

export default PrivateRoute;