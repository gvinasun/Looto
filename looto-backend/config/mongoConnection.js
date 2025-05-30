const mongoose = require("mongoose"); // Importamos la biblio mongoose para la conexión con MongoDB

// Función para conectar a la base de datos MongoDB
const connectDB = async () => {
  try {
    // Intentamos establecer la conexión usando la URI
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    });
    // Si la conexión es buena, mostramos el host de la base de datos
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    // Si ocurre un error, lo mostramos en la consola y detenemos el proceso
    console.error(`Fallo en la conexión: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB; // Exportamos la función para usarla en otros archivos

