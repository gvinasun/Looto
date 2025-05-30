const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

const router = express.Router();

// Función para validar contraseñas
// Evalúa si la contraseña cumple con los siguientes requisitos que se han definido
function validatePassword(password) {
  if (password.length < 8) {
    return {
      valid: false,
      message: "La contraseña debe tener al menos 8 caracteres",
    };
  }

  let hasLowercase = false;
  let hasUppercase = false;
  let hasNumber = false;
  let hasSpecialChar = false;
  const specialChars = "!@#$%^&*()-_=+[]{}|;:',.<>?/`~";

  // Evaluamos cada carácter de la contraseña
  for (const char of password) {
    if (char >= "a" && char <= "z") hasLowercase = true;
    else if (char >= "A" && char <= "Z") hasUppercase = true;
    else if (char >= "0" && char <= "9") hasNumber = true;
    else if (specialChars.includes(char)) hasSpecialChar = true;

    // Si cumple todos los requisito, se devuelve la validación
    if (hasLowercase && hasUppercase && hasNumber && hasSpecialChar) {
      return { valid: true };
    }
  }

  // Si falta algún requisito, devolvemos el mensaje correspondiente
  if (!hasLowercase)
    return {
      valid: false,
      message: "La contraseña debe contener al menos una letra minúscula",
    };
  if (!hasUppercase)
    return {
      valid: false,
      message: "La contraseña debe contener al menos una letra mayúscula",
    };
  if (!hasNumber)
    return {
      valid: false,
      message: "La contraseña debe contener al menos un número",
    };
  if (!hasSpecialChar)
    return {
      valid: false,
      message: "La contraseña debe contener al menos un carácter especial",
    };

  return { valid: true };
}

// La ruta para registrar un usuario
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Se valida la contraseña antes de continuar
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({ message: passwordValidation.message });
    }

    // Se verifica si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hashear la contraseña original en texto, por una versión codificada, para almacenarla de manera segura
    const salt = await bcrypt.genSalt(10); // Generar un "salt" para aumentar la seguridad del hash, haciendolo aleatorio, asi dos personas con una misma contraseña tendran hashes distintos
    const hashedPassword = await bcrypt.hash(password, salt); // Crear el hash de la contraseña

    // Se crea un nuevo usuario con el correo y la contraseña hasheada
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save(); // Se guarda el nuevo usuario en la base de datos

    // Si no hay problemas en el registro
    res
      .status(201)
      .json({ message: "Usuario registrado", email: newUser.email });
  } catch (error) {
    // Manejo de errores internos del servidor
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// La ruta para el login de usuario
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Se verifica si el usuario existe en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuario no registrado" });
    }

    // Se compara la contraseña ingresada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Si no hay problemas en el login
    res.status(200).json({
      message: "Login confirmado",
      user: {
        _id: user._id,
        email: user.email,
      },
    });
    
  } catch (error) {
    // Manejo de errores internos del servidor
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
