const mongoose = require("mongoose");

// Definimos el esquema para los artículos
const ArticleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Referencia al ID del usuario que subió el artículo
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
    },
    photos: {
      type: [String], // Array de URLs de las fotos subidas
      validate: {
        validator: function (arr) {
          return arr.length > 0; // Al menos subir una foto es obligatoria
        },
        message: "Debes subir al menos una foto del artículo",
      },
    },
    operation: {
      type: String,
      enum: ["vender", "intercambiar", "ambas"],
      required: [
        true,
        "Debes seleccionar una opción: vender, intercambiar o ambas",
      ],
    },
    state: {
      type: String,
      enum: ["nuevo", "como nuevo", "usado", "mal estado"],
      required: [true, "Debes seleccionar el estado del artículo"],
    },
    price: {
      type: Number,
      validate: {
        validator: function (value) {
          if (
            this.operation === "vender" ||
            this.operation === "ambas"
          ) {
            return value != null && value >= 0;
          }
          return true; // No es obligatorio el precio si la persona quiere solo intercambiar
        },
        message:
          "Debes introducir un precio válido si vendes o buscar hacer ambas cosas",
      },
    },
  },
  {
    timestamps: true, // Cuando creemos un art, Mongoose agrega automáticamente "createdAt" y "updatedAt", con la h y fecha actual
  }
);

// Se crea el modelo a partir del esquema que hemos definido
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
