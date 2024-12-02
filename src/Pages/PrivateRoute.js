import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  // Render children only if the user is authenticated
  const isAuthenticated =
    localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
