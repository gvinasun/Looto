import React from "react";
import LootoNavbar from "../components/Navbar/LootoNavbar";
import UserProfile from "../components/UserProfile/ProfileUser";
import UserArticles from "../components/UserArticles/Articles";
import Footer from "../components/Footer/Footer";

const UserPage = () => {
  return (
    <div>
      <LootoNavbar />
      <div className="page-container my-5">
        <UserProfile />
        <UserArticles />
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;
