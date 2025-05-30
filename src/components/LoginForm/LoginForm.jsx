import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import eyeOpen from "../../assets/eye-visible-icon.png";
import eyeClosed from "../../assets/eye-no-visible-icon.png";

const LoginForm = () => {
  const navigate = useNavigate();

  // Estado para almacenar los datos del formulario y mostrar la contraseña
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Funciones para ocultar o mostrar la contraseña al mantener presionado el ícono del ojo
  const handleMouseDown = () => setShowPassword(true);
  const handleMouseUp = () => setShowPassword(false);

  // Actualiza los valores del formulario, en los inputs, cuando alguien escribe
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Envia el formulario de inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Hacemos una solicitud POST al servidor
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          method: "POST", // Enviamos los datos
          headers: { "Content-Type": "application/json" },
          // Se convierten los datos de inicio de sesión en una cadena JSON
          body: JSON.stringify({ email: form.email, password: form.password }),
        }
      );

      // Convierte la respuesta del servidor a JSON y se guardan en la variable que hemos creado data
      const data = await response.json();

      // Por si hay error en la respuesta
      if (!response.ok) {
        throw new Error(data.message || "Error en el login");
      }

      // Guardamos el ID del usuario, por si este quiere subir un articulo, vincularlo
      localStorage.setItem("userId", data.user._id);

      // Guardamos los datos para la sesión
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userEmail", data.user.email);

      // Se nos redirige al home
      navigate("/home");
    } catch (err) {
      setError(err.message); // Nos muestra si llega a haber un error
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Inicia sesión en Looto</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.separator}></div>

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
              onMouseLeave={handleMouseUp}
            />
          </div>
        </div>

        {/* Creamos el recuadro para recordar la contraseña, y un enlace para recuperarla */}
        <div className={styles.passwordOptions}>
          <label className={styles.rememberMe}>
            <input type="checkbox" name="remember" />
            Recordar contraseña
          </label>
          <a href="/forgot-password" className={styles.forgotPassword}>
            ¿Olvidaste la contraseña?
          </a>
        </div>

        {/* Botón para iniciar sesión si estan los campos bien */}
        <button type="submit" className={styles.submitButton}>
          Iniciar sesión
        </button>
      </form>

      {/* Enlace para dirigirnos a la página para registrarse, en caso de no tener cuenta */}
      <div className={styles.register}>
        No tienes una cuenta?{" "}
        <a href="/register" className={styles.registerLink}>
          Regístrate
        </a>
      </div>

      {/* Se muestra en caso de que exista un error */}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default LoginForm;
