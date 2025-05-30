import React from "react";
import RegisterSection from "../components/RegisterSection/RegisterSection";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import "../App.css";

const Register = () => {
  return (
    <div className="registerContainer">
      <RegisterSection />
      <RegisterForm />
    </div>
  );
};

export default Register;
