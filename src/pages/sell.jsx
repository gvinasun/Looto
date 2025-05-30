import React from "react";
import LootoNavbar from "../components/Navbar/LootoNavbar";
import UploadArticleForm from "../components/UploadArticleForm/UploadArticleForm";
import Footer from "../components/Footer/Footer";
import "../App.css";

const Sell = () => {
  return (
    <div>
      <LootoNavbar />
      <div className="page-container">
        <UploadArticleForm />
      </div>
      <Footer />
    </div>
  );
};

export default Sell;
