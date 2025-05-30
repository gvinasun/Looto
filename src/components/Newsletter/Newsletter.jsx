import React, { useState } from "react";
import styles from "./Newsletter.module.css";

const Newsletter = () => {

  // Almacenamos el email que ingresa el usuario
  const [email, setEmail] = useState("");

  // Al hacer clic en el botón, se abre el correo 
  const handleSubscribe = () => {
    window.location.href = `mailto:lootoinfo@gmail.com?subject=Suscripción a la Newsletter&body=Correo del usuario: ${email}`;
  };

  return (
    <section className={`${styles.newsletterContainer} text-center py-4`}>
      <p className={`${styles.text} fw-semibold`}>
        Suscríbete a la Newsletter de Looto
      </p>
      <input
        type="email"
        className={`${styles.input} form-control mx-auto`}
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className={styles.button} onClick={handleSubscribe}>
        Suscribirme
      </button>
    </section>
  );
};

export default Newsletter;
