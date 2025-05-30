import React from "react";
import styles from "./AboutUs.module.css";
import testImg from "../../assets/aquarius-girl-test.jpg";
import contactIcon from "../../assets/email_icon.png";

const AboutUs = () => {
  return (
    <div className={styles.aboutUsContainer}>
      <h1 className={styles.title}>Acerca de nosotros</h1>
      <hr />
      <div className={styles.imageSection}>
        <img src={testImg} alt="aboutUs-img" className={styles.image} />
      </div>
      <div className={styles.textContent}>
        <p>
          Somos <strong>LOOTO</strong>, un espacio digital pensado para
          coleccionistas y aficionados, donde podrás comprar, vender e
          intercambiar tus coleccionables de forma segura. Queremos que el
          coleccionismo sea más accesible, transparente y sostenible.
        </p>
        <p>
          En los últimos años, el fenómeno del coleccionismo de blind boxes,
          gachapon y figuras coleccionables está en pleno auge a nivel global.
        </p>
        <p>
          Nuestra misión es clara: conectar a coleccionistas de todo el mundo,
          facilitar experiencias seguras y auténticas, y apoyar una forma de
          coleccionar más consciente y colaborativa.
        </p>
        <p>Bienvenido/a al nuevo hogar del coleccionismo.</p>
      </div>
      <div className={styles.contactTtitle}>
        <h2>Contacto</h2>
        <hr />
        <div className={styles.contactInfo}>
          <img
            src={contactIcon}
            alt="contact-info-icon"
            className={styles.contactIcon}
          />
          <span>
            Email: <a href="mailto:lootoinfo@gmail.com">lootoinfo@gmail.com</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
