import React from "react";
import styles from "./ProfileUser.module.css";
import boyCar from "../../assets/boy-car.jpg";
import stars from "../../assets/star.jpg";

const UserProfile = () => {
  const userEmail = localStorage.getItem("userEmail");

  return (
    <div className={styles.userProfile}>
      <div className={styles.avatarSection}>
        <div>
          {/* Imagen de avatar del usuario */}
          <img src={boyCar} alt="Register_section" className={styles.avatar} />
        </div>
        <div className={styles.userInfo}>
          <h1 className={styles.username}>
            {userEmail || "Nombre de usuario"}
          </h1>
          <ul className={styles.userDetails}>
            <li>Ubicación</li>
            <li>Miembro desde 2025</li>
            <li>Verificado</li>
          </ul>
          <div className={styles.stars}>
            {/* Visual que muestra un array de 5 estrellas referentes a la valoracion del usuario */}
            {[...Array(5)].map((_, i) => (
              <img key={i} src={stars} alt="stars-people-ratings" />
            ))}
          </div>
          <span className={styles.reviews}>73 valoraciones</span>
        </div>
      </div>
      {/* Descripción opcional para el usuario */}
      <p className={styles.description}>Descripción del usuario</p>
    </div>
  );
};

export default UserProfile;
