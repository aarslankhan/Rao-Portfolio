import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import { Newsletter } from "./Newsletter";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col lg={12}>
            <Newsletter 
              status="" 
              message="" 
              onValidated={(result) => console.log(result)} 
            />
          </Col>
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" style={{ width: '50%', height: 'auto' }} />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/raozeeshanaltaf/"><img src={navIcon1} alt="Icon" /></a>
              <a href="https://www.facebook.com/raozeeshan.altaf.3"><img src={navIcon2} alt="Icon" /></a>
            </div>
            <p>Copyright 2024. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
