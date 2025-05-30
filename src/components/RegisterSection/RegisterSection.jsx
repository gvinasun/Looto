import React from "react";
import { Link } from "react-router-dom";
import styles from "./RegisterSection.module.css";
import boyCar from "../../assets/boy-car.jpg";

const RegisterSection = () => {
  return (
    <div className={styles.registerSection}>
      <Link to="/home" className={styles.title}>
        LOOTO
      </Link>
      <p className={styles.slogan}>
        Compra, vende o intercambia tus coleccionables favoritos, en una
        comunidad especializada
      </p>
      <div>
        <img src={boyCar} alt="Register_section" className={styles.image} />
      </div>
    </div>
  );
};

export default RegisterSection;
