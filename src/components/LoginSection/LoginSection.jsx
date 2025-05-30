import React from "react";
import { Link } from "react-router-dom";
import styles from "./LoginSection.module.css";
import boyCar from "../../assets/boy-car.jpg";

const LoginSection = () => {
  return (
    <div className={styles.loginSection}>
      <Link to="/home" className={styles.title}>
        LOOTO
      </Link>
      <p className={styles.slogan}>
        Compra, vende o intercambia tus coleccionables favoritos, en una
        comunidad especializada
      </p>
      <div>
        <img src={boyCar} alt="Login_section" className={styles.image} />
      </div>
    </div>
  );
};

export default LoginSection;
