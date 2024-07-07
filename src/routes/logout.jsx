import React, { useState } from 'react';
import Login, { Render } from 'react-login-page';
import Logo from 'react-login-page/logo-rect';
import './login.css';
import { Form, Link, Navigate, redirect, useActionData, useNavigate } from 'react-router-dom';
import {DataStore} from '../utils/DataStore.js';
import {auth_get_token} from '../utils/APIHelper.js';
import { useAuth } from '../hooks/useAuth.jsx';
import { validateToken } from '../components/ValidateToken.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.jsx';

 

const LogoutPage = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
      logout();
    };
  
    return (
      <div>
        <h1>This is a Secret page</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
};
export default LogoutPage;