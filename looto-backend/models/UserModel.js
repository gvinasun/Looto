const mongoose = require("mongoose"); // Importamos mongoose 

// Definimos el esquema para el modelo de usuario
const userSchema = new mongoose.Schema({
  email: {
    type: String, // tipo string
    required: true, // campo obligatorio
    unique: true, // único
    lowercase: true, // se almacenará en minúsculas
    trim: true, // quita los espacios en blanco
  },
  password: {
    type: String, 
    required: true, 
  },
});

// Exportamos el modelo de usuario segun los campos creados
module.exports = mongoose.model("User", userSchema);