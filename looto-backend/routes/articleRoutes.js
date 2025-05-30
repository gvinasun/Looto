const express = require("express");
const multer = require("multer");
const Article = require("../models/ArticleModel");

const router = express.Router();
const mongoose = require("mongoose");

// Configuración del Multer para asi manejar la subida de img, recibiéndolas y almacenándolas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta en la que se guardarán las img que subamos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para cada archivo subido
  },
});

const upload = multer({ storage });

// La ruta para subir el artículo con fotos y además validar el usuario
router.post("/uploads", upload.array("photos"), async (req, res) => {
    const { title, description, user, operation, state, price } = req.body;
  
    // Validación del ID del usuario
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

  // Array de rutas para las fotos subidas
  const photos = req.files.map((file) => `/uploads/${file.filename}`);

  try {
    const newArticle = new Article({
      title,
      description,
      photos, 
      user,
      operation,
      state,
      price: operation !== "intercambiar" ? Number(price) : undefined,
    });
    await newArticle.save();
    res.status(201).json({ message: "Artículo subido con éxito", article: newArticle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir el artículo" });
  }
});

// La ruta para obtener los artículos de un usuario para su perfil
router.get("/my-articles", async (req, res) => {
  const userId = req.query.userId;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "ID de usuario inválido" });
  }

  try {
    const articles = await Article.find({ user: userId });
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los artículos" });
  }
});


// La ruta pública para obtener los artículos de todos los usuarios 
router.get("/public", async (req, res) => {
  try {
    const articles = await Article.find({})
      .sort({ createdAt: -1 }) // Ordena a partir de la fecha de creación
      .limit(10);  // Devuelve los últimos 10 artículos
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los artículos de los usuarios" });
  }
});

// La ruta para buscar artículos por nombre (título)
router.get("/search", async (req, res) => {
  const { q } = req.query; // El termino a buscar

  if (!q || typeof q !== "string") {
    return res.status(400).json({ message: "Debe proporcionar un término de búsqueda" });
  }

  try {
    const articles = await Article.find({
      title: { $regex: q, $options: "i" } // 'i' = insensible a mayúsculas
    })
      .sort({ createdAt: -1 })
      .limit(20); // Ajustamos el límite para que se muestren 20 artículos
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al buscar artículos" });
  }
});

// La ruta para obtener un artículo concreto gracias a su ID
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "No encontrado" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el artículo" });
  }
});

// Ruta para eliminar un artículo a partir de su ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Artículo no encontrado" });
    res.json({ message: "Artículo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el artículo" });
  }
});


module.exports = router;
