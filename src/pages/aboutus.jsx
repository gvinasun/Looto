import React from "react";
import LootoNavbar from "../components/Navbar/LootoNavbar";
import AboutUs from "../components/AboutUs/AboutUs";
import Footer from "../components/Footer/Footer";

const Us = () => {
  return (
    <div>
      <LootoNavbar />
      {/* deja un espacio arriba, para que el navbar no se superponga con el contenido*/}
      <div className="page-container my-5">
        <AboutUs />
      </div>
      <Footer />
    </div>
  );
};

export default Us;
