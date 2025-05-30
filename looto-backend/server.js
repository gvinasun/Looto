const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/mongoConnection");
const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const path = require("path");
const app = express();

// Carga variables de entorno de .env
dotenv.config();

// Conexión a la base de datos MongoDB
console.log("Conectando a MongoDB");
connectDB();
console.log("Conexión iniciada");

app.get("/", (req, res) => {
  res.send("Servidor backend en funcionamiento");
});

// Hace accesibles públicamente a las img subidas de la carpeta "uploads" a través de la ruta "/uploads"
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Permite la comunicación con el frontend, y aceptar solicitudes de este
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Middlewares para parsear el cuerpo de las peticiones
app.use(bodyParser.json());
app.use(express.json());

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
