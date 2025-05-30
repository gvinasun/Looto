import React from "react";
import LoginSection from "../components/LoginSection/LoginSection";
import LoginForm from "../components/LoginForm/LoginForm";
import "../App.css";

const Login = () => {
  return (
    <div className="loginContainer">
      <LoginSection />
      <LoginForm />
    </div>
  );
};

export default Login;
