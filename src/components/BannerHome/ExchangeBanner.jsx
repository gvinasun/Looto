import React from "react";
import styles from "./ExchangeBanner.module.css";
import { Link } from "react-router-dom";
import exchangeImgAnime from "../../assets/exchange-anime.jpg";

const ExchangeBanner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <h3 className={styles.heading}>Intercambia con otros coleccionistas</h3>
        <p className={styles.description}>
          Tal vez ya tienes esa blind box repetida, o simplemente quieres
          renovar tu colección. Intercambia con otros coleccionistas y encuentra
          justo lo que buscas. ¡Haz que cada ítem cuente!
        </p>
        <Link to="/exchange" className={styles.primaryButton}>
          INTERCAMBIA!
        </Link>
      </div>
      <div className={styles.imageSection}>
        <img
          src={exchangeImgAnime}
          alt="Img_de_la_sección_intercambio"
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default ExchangeBanner;
