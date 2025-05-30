import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const FooterPage = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="justify-content-center text-center">
          <Col>
            <h5>LOOTO</h5>
            <p>© Todos los derechos reservados</p>
          </Col>
          <Col>
            <h6>SOBRE NOSOTROS:</h6>
            <ul>
              <li>
                <Link to="/aboutus">Quiénes somos</Link>
              </li>
              <li>Dónde estamos</li>
              <li>Historia</li>
              <li>Política de privacidad</li>
              <li>Condiciones generales</li>
            </ul>
          </Col>
          <Col>
            <h6>Contacto</h6>
            <ul>
              <li>Blog</li>
            </ul>
            <h6>Síguenos:</h6>
            <ul>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Facebook</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterPage;
