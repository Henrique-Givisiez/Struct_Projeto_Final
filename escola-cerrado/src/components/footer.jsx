import "./footer.css";
import { FaEnvelope, FaInstagram, FaPhone, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-container">
      <img src="/images/logo-escola.jpg" alt="Escola do Cerrado" className="footer-logo" />
      <div className="footer-content">
        <div className="footer-icons">
            <FaEnvelope className="icon" />
            <FaInstagram className="icon" />
            <FaPhone className="icon" />
            <FaLinkedin className="icon" />
        </div>
        <p className="footer-text">Copyright © 2025 | Created by Struct</p>
      </div>
    </footer>
  );
};

export default Footer;
