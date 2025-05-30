import React from "react";
import styles from "../UserArticles/ArticlesGrid.module.css";
import { useNavigate } from "react-router-dom";

const ArticlesGrid = ({
  articles,
  showVisits = true,
  showFavorites = true,
  showOperation = false,
  showState = false,
}) => {
  //Creamos la constante para navegar a una nueva página para el articulo
  const navigate = useNavigate();

  return (
    <div className={styles.articlesGrid}>
      {articles.map((article, index) => {
        // Valores aleatorios para visitas y favoritos
        const randomVisits = Math.floor(Math.random() * (200 - 10 + 1)) + 10;
        const randomFavorites = Math.floor(Math.random() * 51);

        // Traduce estado y el tipo de operación, para mostrarlo más claro y bonito
        const showStatus =
          {
            nuevo: "Nuevo",
            "como nuevo": "Como nuevo",
            usado: "Usado",
            "mal estado": "Mal estado",
          }[article.state] || article.state;

        let operationText = "";
        if (article.operation === "vender") operationText = "Venta";
        else if (article.operation === "intercambiar")
          operationText = "Intercambio";
        else if (article.operation === "ambas")
          operationText = "Venta/Intercambio";

        return (
          <div
            key={index}
            className={styles.articleBox}
            /*Hacemos clicable cada artículo, para navegar a su página de detalle */
            onClick={() => navigate(`/article/${article.id || article._id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={article.imageUrl}
              alt={article.name}
              className={styles.articleImg}
              onError={() =>
                console.error("No se pudo cargar:", article.imageUrl)
              }
            />

            <div className={styles.articleContent}>
              <h3>{article.name}</h3>
              {/* Mostramos operación y estado si las propiedades lo permiten (showOperation/showState) */}
              {(showOperation || showState) && (
                <div className={styles.badgeCol}>
                  {showOperation && (
                    <span className={styles.operation}>{operationText}</span>
                  )}
                  {showState && (
                    <span className={styles.state}>{showStatus}</span>
                  )}
                </div>
              )}
              {/* Si es un artículo en venta o ambas, se muestra el precio */}
              <p className={styles.price}>
                {article.operation === "vender" || article.operation === "ambas"
                  ? `€${article.price?.toFixed(2)}`
                  : "\u00A0"}{" "}
                {/*Aunque no haya precio, se reserva el espacio en la "tarjeta", manteniendo la alineación*/}
              </p>
              {/* Datos de visitas y favoritos (random) */}
              {showVisits && (
                <p className={styles.visits}>Visitas: {randomVisits}</p>
              )}
              {showFavorites && (
                <p className={styles.favorites}>Favoritos: {randomFavorites}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticlesGrid;
