import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Search from "../SearchBar/Search";
import styles from "./LootoNavbar.module.css";

// Barra de navegación de Looto
const LootoNavbar = ({
  search = "",
  setSearch = () => {},
  onSearch = () => {},
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Se consulta en localStorage el estado para saber si el usuario ha iniciado sesión o no
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("userLoggedIn") === "true";
  });

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/home");
  };

  // Función para navegar dependiendo de si el usuario está logueado o no
  const nologged = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top" className={styles.navbarContainer}>
      <Container>
        <Navbar.Brand href="/home" className={styles.brand}>
          LOOTO
        </Navbar.Brand>
        {/* Botón para ver el menú con el móvil */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Se centra el buscador, excepto en la página de perfil, el cual no está */}
          {location.pathname !== "/profile" && (
            <div className="flex-grow-1 d-flex justify-content-center">
              <Search
                search={search}
                setSearch={setSearch}
                onSearch={onSearch}
              />
            </div>
          )}
          <Nav className="ms-auto align-items-center">
            {/* Nav para cuando el usuario ha iniciado sesión */}
            {isLoggedIn ? (
              <>
                {/* Menú desplegable para los botones perfil y cerrar sesión */}
                <Dropdown align="end">
                  <Dropdown.Toggle
                    as="button"
                    variant="none"
                    id="dropdown-basic"
                    className={`me-2 ${styles.buttonNav} ${styles.outlineSecondary}`}
                  >
                    PERFIL
                  </Dropdown.Toggle>

                  <Dropdown.Menu className={styles.dropdownMenuStyle}>
                    <Dropdown.Item
                      className={styles.dropdownItemStyle}
                      onClick={() => navigate("/profile")}
                    >
                      Perfil
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles.dropdownItemStyle}
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* Botón intercambio */}
                <Button
                  as="button"
                  variant="none"
                  className={`me-2 ${styles.buttonNav} ${styles.outlineSecondary}`}
                  onClick={() => navigate("/exchange")}
                >
                  INTERCAMBIAR
                </Button>
                {/* Botón vender, solo si el usuario está logueado */}
                <Button
                  as="button"
                  variant="none"
                  className={`me-2 ${styles.buttonNav} ${styles.outlineSecondary}`}
                  onClick={() => nologged("/sell")}
                >
                  VENDER
                </Button>
              </>
            ) : (
              // Nav para cuando el usuario no ha iniciado sesión
              <>
                {/* Botón intercambio */}
                <Button
                  as="button"
                  variant="none"
                  className={`me-2 ${styles.buttonNav} ${styles.outlineSecondary}`}
                  onClick={() => navigate("/exchange")}
                >
                  INTERCAMBIAR
                </Button>
                {/* Botón vender, pide login si no está logueado */}
                <Button
                  as="button"
                  variant="none"
                  className={`me-2 ${styles.buttonNav} ${styles.outlineSecondary}`}
                  onClick={() => nologged("/sell")}
                >
                  VENDER
                </Button>
                {/* Enlaces a la pagina iniciar sesión o registrarse */}
                <Nav.Link onClick={() => navigate("/login")} className="me-2">
                  INICIAR SESIÓN
                </Nav.Link>
                <Nav.Link
                  onClick={() => navigate("/register")}
                  className="me-2"
                >
                  REGÍSTRATE
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LootoNavbar;
