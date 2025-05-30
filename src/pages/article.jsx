import React from "react";
import LootoNavbar from "../components/Navbar/LootoNavbar";
import ArticleDetail from "../components/UserArticles/ArticleDetail";
import Footer from "../components/Footer/Footer";
import "../App.css";

const Aritcle = () => {
  return (
    <div>
      <LootoNavbar />
      <div className="page-container">
        <ArticleDetail />
      </div>
      <Footer />
    </div>
  );
};

export default Aritcle;
