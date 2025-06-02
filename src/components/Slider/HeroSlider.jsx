import React from "react";
import { Carousel } from "react-bootstrap";
import styles from "./HeroSlider.module.css"; 
import sliderImgAsuna from "../../assets/slider-asuna-eva.jpg";
import sliderImgKirby from "../../assets/slider-kirby.jpg";
import sliderImgOP from "../../assets/slider-onepiece.jpg";
import sliderImgKirbyPhoto from "../../assets/slider-kirby-photo.jpg";

const Slider = () => {
  // Se definen las imágenes y textos en un array
  const images = [
    {
      src: sliderImgAsuna,
      title: "Bienvenido a la comunidad de coleccionistas",
      description:
        "Descubre, intercambia y comparte tu pasión. Todo comienza aquí",
    },
    {
      src: sliderImgKirby,
      title: "Intercambia o vende y alcanza el 100%",
      description:
        "¡Completa tus colecciones y ayuda a otros a hacer lo mismo!",
    },
    {
      src: sliderImgOP,
      title: "Publica tus artículos y encuentra un intercambio rápido",
      description: "Nuestra comunidad está en movimiento",
    },
    {
      src: sliderImgKirbyPhoto,
      title: "Haz una buena foto y destaca tu artículo",
      description: "Una imagen bien tomada puede marcar la diferencia",
    },
  ];

  return (
    <Carousel fade className={styles.containerSlider}>
      {/* Recorremos el array de imágenes para crear cada slide */}
      {images.map((item, index) => (
        <Carousel.Item key={index} className={styles.slider}>
          {/* Imagen principal del slide */}
          <img src={item.src} alt={`Slide de imágenes ${index + 1}`} />
           {/* Capa superpuesta para leer mejor el texto */}
          <div className={styles.overlay}></div>
          <Carousel.Caption className={styles.caption}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
