import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/register" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
