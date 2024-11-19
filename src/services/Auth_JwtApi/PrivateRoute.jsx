import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import authService from "./AuthService";

const PrivateRoute = () => {
  const isAuthenticated = authService.isAuthenticated();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
