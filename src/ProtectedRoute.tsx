import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};

const ProtectedRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
