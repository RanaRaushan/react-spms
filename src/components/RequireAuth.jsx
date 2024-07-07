import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validateToken } from "./ValidateToken";

export const RequireAuth = ({ children }) => {
  const { token, logout } = useAuth();
  const location = useLocation();
  if (location.pathname !== "/login" && (!token || !validateToken(token))) {

    return <Navigate to="/login" />;
  }
  if (validateToken(token) && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }
  return children;
};