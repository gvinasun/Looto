import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ArticleDetail.module.css";
import boyCar from "../../assets/boy-car.jpg";
import starImg from "../../assets/star.jpg";

const ArticleDetail = () => {
  const { id } = useParams(); // Obtenemos el id del artículo de la URL
  const navigate = useNavigate(); // Para redirigir después de eliminar
  const [article, setArticle] = useState(null); // Guardamos los datos del artículo
  const [loading, setLoading] = useState(true); // Para mostrar un msj mientras se cargan los datos

  const userId = localStorage.getItem("userId"); // Obtenemos el ID de localStore
  const isLoggedIn = !!userId; // Comprobamos si el usuario ha iniciado sesión

  // Al cargar el componente, pedimos y obtenemos los datos del art al backend
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/articles/${id}`
        );
        const data = await response.json();
        if (response.ok) setArticle(data); // Guardamos el artículo
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  // Lógica para eliminar el artículo, solo el propietario puede eliminar
  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/articles/${id}?userId=${userId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("Artículo eliminado correctamente.");
          navigate("/profile");
        } else {
          const data = await response.json();
          alert(data.message || "Error al eliminar el artículo");
        }
      } catch (error) {
        alert("Error al eliminar el artículo");
      }
    }
  };

  // Si está cargando o no se encuentra el art, mostramos msj
  if (loading) return <div>Cargando...</div>;
  if (!article) return <div>No encontrado</div>;

  // Traduce estado y el tipo de operación, para mostrarlo más claro y bonito
  const stateMap = {
    nuevo: "Nuevo",
    "como nuevo": "Como nuevo",
    usado: "Usado",
    "mal estado": "Mal estado",
  };
  const operationMap = {
    vender: "Venta",
    intercambiar: "Intercambio",
    ambas: "Venta/Intercambio",
  };

  // Solo muestra el botón de eliminar si el usuario esta logueado, y es la persona que ha subido el artículo
  const isOwner =
    isLoggedIn && article.user && String(article.user) === String(userId);

  return (
    <div className={styles.detailContainer}>
      {/* Imágenes del artículo */}
      <div className={styles.imagesSection}>
        {article.photos &&
          article.photos.map((url, idx) => (
            <img
              key={idx}
              src={`${process.env.REACT_APP_API_URL}${url}`}
              alt={`Imagen ${idx + 1}`}
              className={styles.mainImg}
            />
          ))}
      </div>
      {/* Información del artículo */}
      <div className={styles.infoSection}>
        <h2>{article.title}</h2>
        <p className={styles.state}>{stateMap[article.state]}</p>
        <p>{article.description}</p>
        {/* Tipo de operación y precio si corresponde */}
        <div className={styles.row}>
          <span className={styles.operation}>
            {operationMap[article.operation]}
          </span>
          {(article.operation === "vender" ||
            article.operation === "ambas") && (
            <span className={styles.price}>€{article.price?.toFixed(2)}</span>
          )}
        </div>

        {/* Botones de acción, tanto para visitantes o usuarios que no sean el propietario*/}
        <div className={styles.buttons}>
          {(!isLoggedIn || (isLoggedIn && !isOwner)) && (
            <>
              {(article.operation === "vender" ||
                article.operation === "ambas") && (
                <button className={styles.buyBtn}>Comprar</button>
              )}
              {(article.operation === "intercambiar" ||
                article.operation === "ambas") && (
                <button className={styles.tradeBtn}>Intercambiar</button>
              )}
            </>
          )}
        </div>

        {/* Botón de eliminar solo si está logueado y es el propietario del artículo */}
        {isOwner && (
          <button className={styles.deleteButton} onClick={handleDelete}>
            Eliminar artículo
          </button>
        )}
        {/* Sección de perfil del usuario que ha subido el artículo */}
        <div className={styles.userBox}>
          <div className={styles.userProfile}>
            <img
              src={boyCar}
              alt="Avatar vendedor"
              className={styles.userAvatar}
            />
            <div className={styles.userDetails}>
              <div className={styles.userName}>Nombre de usuario</div>
              <div className={styles.userRatingsRow}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src={starImg} alt="star" />
                  ))}
                </div>
                <span className={styles.reviews}>73</span>
              </div>
              <div className={styles.userLocation}>Barcelona, España</div>
              <div className={styles.userLastSeen}>
                Última visita: hace 44 minutos
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
