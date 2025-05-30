import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import eyeOpen from "../../assets/eye-visible-icon.png";
import eyeClosed from "../../assets/eye-no-visible-icon.png";

const RegisterForm = () => {
  const navigate = useNavigate();

  // Estado para almacenar los datos del formulario
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Estado para mostrar la contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Funciones para ocultar o mostrar la contraseña al mantener presionado el ícono del ojo
  const handleMouseDown = () => setShowPassword(true);
  const handleMouseUp = () => setShowPassword(false);
  // Las mismas funciones pero para confirmar la contraseña
  const handleConfirmMouseDown = () => setShowConfirmPassword(true);
  const handleConfirmMouseUp = () => setShowConfirmPassword(false);

  // Actualiza los valores del formulario, en los inputs, cuando alguien escribe
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Envia el formulario de registro
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Comprueba que las dos contraseñas son iguales
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // Hacemos una solicitud POST al servidor
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST", // Enviamos los datos
        headers: { "Content-Type": "application/json" },
        // Se convierten los datos de registro en una cadena JSON
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      // Convierte la respuesta del servidor a JSON y se guardan en la variable que hemos creado data
      const data = await response.json();

      // Por si hay error en la respuesta
      if (!response.ok) {
        throw new Error(data.message || "Error al registrarse");
      }

      // Guardamos el email en localStorage para asi mostrar mensaje de bienvenida
      localStorage.setItem("userEmail", data.email);

      alert("Registro completo");
      // Se nos redirige al home
      navigate("/home");
    } catch (err) {
      setError(err.message); // Nos muestra si llega a haber un error
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.title}>Regístrate en Looto</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.separator}></div>

        {/* Muestra los errores */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Campo para el correo */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="usuario@email.com"
            value={form.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        {/* Campo para la contraseña, con opción para mostrarla o mantenerla oculta */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Contraseña
          </label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="•••••••"
              value={form.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <img
              src={showPassword ? eyeOpen : eyeClosed}
              alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              className={styles.passwordIcon}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            />
          </div>
        </div>

        {/* Campo para confirmar la contraseña, con opción para mostrarla o mantenerla oculta */}
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirmar Contraseña
          </label>
          <div className={styles.passwordWrapper}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="•••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <img
              src={showConfirmPassword ? eyeOpen : eyeClosed}
              alt={
                showConfirmPassword
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }
              className={styles.passwordIcon}
              onMouseDown={handleConfirmMouseDown}
              onMouseUp={handleConfirmMouseUp}
            />
          </div>
        </div>
        {/* Botón para registrarnos si estan los campos bien */}
        <button type="submit" className={styles.submitButton}>
          Registrarse
        </button>
      </form>
      {/* Hay un enlace para dirigirnos a la página de inicio de sesion en caso de que tengamos ya una cuenta creada */}
      <div className={styles.loginLink}>
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className={styles.login}>
          Inicia sesión
        </a>
      </div>
    </div>
  );
};

export default RegisterForm;
