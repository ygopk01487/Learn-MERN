import React from "react";
import LoginForm from "../component/auth/LoginForm";
import RegisterForm from "../component/auth/RegisterForm";
import { AuthContext } from "../context/Authcontext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Auth = ({ authRouter, setActive }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  let body;
  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  } else {
    body = (
      <>
        LearnIt
        {authRouter === "/login" && <LoginForm />}
        {authRouter === "/register" && <RegisterForm />}
      </>
    );
  }
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>LeartIt</h1>
          <h4>Keep trach of what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
