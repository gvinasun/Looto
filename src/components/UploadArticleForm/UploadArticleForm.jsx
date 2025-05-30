import React, { useState } from "react";
import "./UploadArticleForm.css";
import { useNavigate } from "react-router-dom";

const UploadArticleForm = () => {
  // Estados para los datos que se introducen en el form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  // Valores por defecto cuando abrimos el formulario, que sirven de ejemplo
  const [state, setState] = useState("nuevo");
  const [operation, setoperation] = useState("intercambiar");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  // Al seleccionar fotos, se añaden al array de fotos del estado
  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    setPhotos([...photos, ...files]);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que se recargue la página

    const formData = new FormData(); // Usamos FormData para poder subir imágenes
    const userId = localStorage.getItem("userId"); // Obtenemos el ID del usuario que ha iniciado sesión
    if (!userId || userId === "null") {
      alert("No has iniciado sesión. No se puede subir el artículo.");
      return;
    }

    // Añadimos al FormData todos los datos del formulario
    formData.append("user", userId);
    formData.append("title", title);
    formData.append("description", description);
    photos.forEach((photo) => formData.append("photos", photo)); // Se pueden añadir varias imágenes
    formData.append("operation", operation);
    formData.append("state", state);

    // Solo se muestra el campo de precio si es venta o ambas opciones
    if (operation !== "intercambiar") {
      formData.append("price", price);
    }

    try {
      // Enviamos los datos del form al backend
      const response = await fetch(
        "http://localhost:5000/api/articles/uploads",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert("Artículo subido con éxito");
      console.log(data);
      navigate("/profile");
    } catch (error) {
      console.error("Error al subir el artículo:", error);
      alert("Error al subir el artículo. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <h4 className="containerUploadArticle">Subir artículo</h4>
      <form className="upArtForm" onSubmit={handleSubmit}>
        {/* Subida de fotos */}
        <div className="form uploadPhotos">
          <label htmlFor="photoUpload" className="photoUploadLabel">
            <div className="photoUploadContour">+ Subir fotos</div>
          </label>
          <input
            type="file"
            id="photoUpload"
            name="photos"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ display: "none" }}
          />
        </div>

        {/* Título del artículo */}
        <div className="form">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            placeholder="Ejemplo: BlindBox de PopMart"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Descripción del artículo */}
        <div className="form">
          <label htmlFor="description">Describe tu artículo</label>
          <textarea
            id="description"
            placeholder="Ejemplo: Nuevo, solo abierto para saber el personaje"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Tipo de operación */}
        <div className="form">
          <label>¿Qué prefieres?</label>
          <select
            value={operation}
            onChange={(e) => setoperation(e.target.value)}
            required
          >
            <option value="vender">Vender</option>
            <option value="intercambiar">Intercambiar</option>
            <option value="ambas">Ambas opciones</option>
          </select>
        </div>

        {/* Estado del artículo */}
        <div className="form">
          <label>Estado del artículo</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          >
            <option value="nuevo">Nuevo</option>
            <option value="como nuevo">Como nuevo</option>
            <option value="usado">Usado</option>
            <option value="mal estado">Mal estado</option>
          </select>
        </div>

        {/* Precio, solo es visible si es para vender o ambas */}
        {operation !== "intercambiar" && (
          <div className="form">
            <label>Precio (€)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required={operation !== "intercambiar"}
            />
          </div>
        )}

        {/* Botón de enviar form */}
        <div className="uploadButton">
          <button type="submit" className="submitButton">
            Subir
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadArticleForm;
