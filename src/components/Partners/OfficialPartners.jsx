import React from "react";
import styles from "./OfficialPartners.module.css";
import kotobukiya from "../../assets/kotobukiya.jpg";
import popMart from "../../assets/popMart.png";
import bandaiSpirits from "../../assets/bandai-spirits.png";

// Lista de objetos para los partners oficiales con nombre e la ruta de su imagen
const partners = [
  { name: "Kotobukiya", image: kotobukiya },
  { name: "Pop Mart", image: popMart },
  { name: "Bandai Spirits", image: bandaiSpirits },
];

const OfficialPartners = () => {
  return (
    <div className={styles.container}>
      {/* Título con línea */}
      <div>
        <h2 className={styles.title}>Nuestros Partners</h2>
        <div className={styles.line}></div>
      </div>
      <div className={styles.partnerContainer}>
        {/* Recorre un array, creando un contenedor para cada img del partner */}
        {partners.map((partner, index) => (
          <div key={index} className={styles.partner}>
            <img
              src={partner.image}
              alt={partner.name}
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficialPartners;
