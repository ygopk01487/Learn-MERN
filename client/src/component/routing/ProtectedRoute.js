import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import Spinner from "react-bootstrap/esm/Spinner";

const ProtectedRoute = ({ children }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  if (authLoading) {
    <div className="spinner-container">
      <Spinner animation="border" variant="info" />
    </div>;
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
