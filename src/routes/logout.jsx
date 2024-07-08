import React from 'react';
import './login.css';
import { useAuth } from '../hooks/useAuth.jsx';
import './logout.css';
import { BiLogOut  } from "react-icons/bi";
import { useLocation } from 'react-router-dom';

const LogoutPage = () => {
    const { token, logout } = useAuth();
    const location = useLocation();
    const currentPath = location.pathname;
    const toShow = currentPath !== '/callback';
    console.log("location",location)
    const handleLogout = () => {
      logout();
    };
  
    return token && toShow && (
      <div className='logout'>
        <button onClick={handleLogout}><BiLogOut /></button>
      </div>
    );
};
export default LogoutPage;