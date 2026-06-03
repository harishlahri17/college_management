// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
