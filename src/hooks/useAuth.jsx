import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const setAuthenticateUser = async (data) => {
    setToken(data);
    navigate("/");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setToken(null);
    console.log("navigate to login ")
    navigate("/login", { replace: true });
  };
  const value = useMemo(
    () => ({
        token,
        setAuthenticateUser,
        logout,
    }),
    [token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};