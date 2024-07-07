import React from 'react';
import './login.css';
import { useAuth } from '../hooks/useAuth.jsx';
import './logout.css';
import { BiLogOut  } from "react-icons/bi";

const LogoutPage = () => {
    const { token, logout } = useAuth();

    const handleLogout = () => {
      logout();
    };
  
    return token && (
      <div className='logout'>
        <button onClick={handleLogout}><BiLogOut /></button>
      </div>
    );
};
export default LogoutPage;