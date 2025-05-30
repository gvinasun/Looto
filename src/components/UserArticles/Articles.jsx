import React, { useEffect, useState } from "react";
import ArticlesGrid from "../UserArticles/ArticlesGrid";
import styles from "./Articles.module.css";

const initialArticleShown = 10; // 10 filas, 10 artículos en el inicio

const UserArticles = () => {

  const [articles, setArticles] = useState([]); // Todos los artículos del usuario
  const [loading, setLoading] = useState(true); // Muesta msj
  const [visibleCount, setVisibleCount] = useState(initialArticleShown);  // Cuántos artículos mostrar
  
  useEffect(() => {
    // Obtenemos el ID de localStore
    const userId = localStorage.getItem("userId");

    // Función para obtener los artículos del usuario desde el backend
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/articles/my-articles?userId=${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          // Adaptamos los datos recibidos al formato esperado por ArticlesGrid
          const adaptedArticles = data.map((article) => ({
            id: article._id,
            name: article.title,
            operation: article.operation,
            state: article.state,
            price: article.price,
            imageUrl: `http://localhost:5000${article.photos[0]}`,
          }));

          setArticles(adaptedArticles); // Guardamos los artículos en el estado
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error cargando artículos:", error);
      } finally {
        setLoading(false); // Ocultamos el msj de carga cuando finalice 
      }
    };

    fetchArticles(); // Llamamos a la función al montar el componente
  }, []);

    // Función para cargar más artículos, solo aparece el botón si el usuario tiene mas de 10
    const handleLoadMore = () => {
      setVisibleCount((prev) => prev + initialArticleShown);
    };
  
    // Se muestran solo los artículos principales, visibles
    const visibleArticles = articles.slice(0, visibleCount);

    return (
      <div className={styles.userArticles}>
        <div className={styles.line}></div>
        <h2 className={styles.sectionTitle}>{articles.length} artículos</h2>
        {loading ? (
          <p>Cargando artículos...</p>
        ) : (
          <>
            <ArticlesGrid articles={visibleArticles} />
            {/* Mostrar botón solo si hay más artículos por mostrar */}
            {visibleCount < articles.length && (
              <button className={styles.loadMoreButton} onClick={handleLoadMore}>
                Ver todos los productos
              </button>
            )}
          </>
        )}
      </div>
    );
  };
  
  export default UserArticles;