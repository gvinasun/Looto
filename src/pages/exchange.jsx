import React from "react";
import LootoNavbar from "../components/Navbar/LootoNavbar";
import Footer from "../components/Footer/Footer";
import ExchangeArticles from "../components/ExchangeArticles/ExchangeArticles";

const Exchange = () => {
  return (
    <div>
      <LootoNavbar />
      <div className="page-container my-5">
        <ExchangeArticles />
      </div>
      <Footer />
    </div>
  );
};

export default Exchange;
