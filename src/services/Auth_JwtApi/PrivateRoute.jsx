import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import authService from "./AuthService";
import LoadingSpinner from "../../components/cards/loadingspiner";

const PrivateRoute = () => {
  const [loading, setLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <LoadingSpinner/>; 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
