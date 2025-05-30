import React, { useEffect, useState } from "react";
import LootoNavbar from "../components/Navbar/LootoNavbar";
import HeroSlider from "../components/Slider/HeroSlider";
import ArticlesGrid from "../components/UserArticles/ArticlesGrid";
import OfficialPartners from "../components/Partners/OfficialPartners";
import ExchangeBanner from "../components/BannerHome/ExchangeBanner";
import Newsletter from "../components/Newsletter/Newsletter";
import Footer from "../components/Footer/Footer";
import "../App.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/articles/public`
        );
        if (!response.ok) {
          const text = await response.text();
          throw new Error(
            `Error ${response.status}: ${response.statusText}\n${text}`
          );
        }
        const data = await response.json();
        const adapted = data.map((article) => ({
          id: article._id,
          name: article.title,
          operation: article.operation,
          state: article.state,
          price: article.price,
          imageUrl: article.photos?.[0]
            ? `${process.env.REACT_APP_API_URL}${article.photos[0]}`
            : undefined,
        }));
        setProducts(adapted);
        setFiltered(adapted);
      } catch (err) {
        setError(err.message);
        console.error("Error en la carga de productos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) {
      setFiltered(products);
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/articles/search?q=${encodeURIComponent(
          search
        )}`
      );
      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `Error ${response.status}: ${response.statusText}\n${text}`
        );
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        const adapted = data.map((article) => ({
          id: article._id,
          name: article.title,
          operation: article.operation,
          state: article.state,
          price: article.price,
          imageUrl: article.photos?.[0]
            ? `${process.env.REACT_APP_API_URL}${article.photos[0]}`
            : undefined,
        }));
        setFiltered(adapted);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error al buscar artículos:", error);
    }
  };

  return (
    <div>
      <LootoNavbar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
      />
      <HeroSlider />
      <div className="page-container my-5">
        <h2 className="section-title">Novedades</h2>
        {loading ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <p style={{ color: "red" }}>
            Error al cargar productos: {error}
          </p>
        ) : (
          <ArticlesGrid
            articles={filtered}
            showVisits={false}
            showFavorites={true}
            showOperation={true}
            showState={true}
          />
        )}
      </div>
      <div className="page-container my-5">
        <OfficialPartners />
      </div>
      <ExchangeBanner />
      <div className="page-container my-5">
        <Newsletter />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

/*import React, { useEffect, useState } from "react";
import LootoNavbar from "../components/Navbar/LootoNavbar";
import HeroSlider from "../components/Slider/HeroSlider";
import ArticlesGrid from "../components/UserArticles/ArticlesGrid";
import OfficialPartners from "../components/Partners/OfficialPartners";
import ExchangeBanner from "../components/BannerHome/ExchangeBanner";
import Newsletter from "../components/Newsletter/Newsletter";
import Footer from "../components/Footer/Footer";
import "../App.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // Estado del buscador
  const [filtered, setFiltered] = useState([]); // Artículos mostrados según búsqueda

  useEffect(() => {
    // Carga todos los artículos públicos del backend
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/articles/public`
        );
        const data = await response.json();
        if (response.ok) {
          // Adapta/renombramos los datos del backend para que tengan el formato que necesita ArticlesGrid
          const adapted = data.map((article) => ({
            id: article._id,
            name: article.title,
            operation: article.operation,
            state: article.state,
            price: article.price,
            imageUrl: article.photos?.[0]
              ? `${process.env.REACT_APP_API_URL}${article.photos[0]}`
              : undefined,
          }));
          setProducts(adapted);
          setFiltered(adapted); // Al inicio, muestra todos los artículos 
        }
      } catch (err) {
        console.error("Error en la carga de productos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // Hace la búsqueda de artículos en el backend según el texto ingresado
  const handleSearch = async () => {
    if (!search.trim()) {
      setFiltered(products); // Si el buscador está vacío, muestra todos los artículos
      return;
    }
    try {
      const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/articles/search?q=${encodeURIComponent(
          search
        )}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        const adapted = data.map((article) => ({
          id: article._id,
          name: article.title,
          operation: article.operation,
          state: article.state,
          price: article.price,
          imageUrl: article.photos?.[0]
          ? `${process.env.REACT_APP_API_URL}${article.photos[0]}`
            : undefined,
        }));
        setFiltered(adapted);
      }
    } catch (error) {
      console.error("Error al buscar artículos:", error);
    }
  };

  return (
    <div>
      <LootoNavbar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
      />
      <HeroSlider />
      <div className="page-container my-5">
        <h2 className="section-title">Novedades</h2>
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          // Mostramos o dejamos de mostrar la info que querramos
          <ArticlesGrid
            articles={filtered}
            showVisits={false}
            showFavorites={true}
            showOperation={true}
            showState={true}
          />
        )}
      </div>
      <div className="page-container my-5">
        <OfficialPartners />
      </div>
      <ExchangeBanner />
      <div className="page-container my-5">
        <Newsletter />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

*/