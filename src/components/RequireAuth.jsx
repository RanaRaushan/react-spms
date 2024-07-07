import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validateToken } from "./ValidateToken";

export const RequireAuth = ({ children }) => {
  const { token, logout } = useAuth();
  const location = useLocation();
  console.log('tokentokentoken', token)
  console.log('children', children, location.pathname)
  console.log('lcoatoin', location.pathname)
  if (location.pathname !== "/login" && (!token || !validateToken(token))) {
    console.log('insdie erquire token', token)
    // user is not authenticated
    // logout()
    // return;
    return <Navigate to="/login" />;
  }
  if (validateToken(token) && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }
  return children;
};