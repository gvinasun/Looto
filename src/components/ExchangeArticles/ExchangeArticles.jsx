import React, { useEffect, useState } from "react";
import ArticlesGrid from "../UserArticles/ArticlesGrid";
import styles from "./ExchangeArticles.module.css";
import LootoNavbar from "../Navbar/LootoNavbar";

const initialArticleShown = 5;

const ExchangeArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(initialArticleShown);
  // Estado de búsqueda vinculado al navbar
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Se obtienen los artículos y filtramos por los que se pueden intercambiar o intercambiar/vender
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/articles/public`
        );
        const data = await response.json();

        if (response.ok) {
          // Filtrar y mapear los artículos
          const filteredArticles = data
            .filter(
              (article) =>
                article.operation === "intercambiar" ||
                article.operation === "ambas"
            )
            .map((article) => ({
              id: article._id,
              name: article.title,
              operation: article.operation,
              state: article.state,
              price: article.price,
              visits: article.showVisits,
              // Obtiene la primera imagen subida como portada
              imageUrl: article.photos?.[0]
                ? `${process.env.REACT_APP_API_URL}${article.photos[0]}`
                : undefined,
            }));

          setArticles(filteredArticles);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error cargando artículos de intercambio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

 // Muestra más artículos al hacer clic en al botón
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + initialArticleShown);
  };

  // Filtra artículos según búsqueda, por el nombre
  const filteredArticles = articles.filter((article) =>
    article.name.toLowerCase().includes(search.toLowerCase())
  );
  // Se muestra al inicio los primeros 5 artículos, que son los que hemos definido
  const visibleArticles = filteredArticles.slice(0, visibleCount);

  const handleSearch = () => {};

  return (
    <div className={styles.exchangeSection}>
      {/* Navbar superior con la búsqueda compartida */}
      <LootoNavbar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
      />
      <h4 className="containerUploadArticle">Artículos para intercambiar</h4>
      {loading ? (
        <p>Cargando artículos...</p>
      ) : filteredArticles.length > 0 ? (
        <>
          <ArticlesGrid
            articles={visibleArticles}
            showOperation={true}
            showState={true}
            showVisits={false}
          />
          {visibleCount < filteredArticles.length && (
            <button className={styles.loadMoreButton} onClick={handleLoadMore}>
              Ver todos los productos
            </button>
          )}
        </>
      ) : (
        <p>No hay artículos disponibles para intercambio en este momento.</p>
      )}
    </div>
  );
};

export default ExchangeArticles;
