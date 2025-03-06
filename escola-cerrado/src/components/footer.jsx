import "./footer.css";
import { FaEnvelope } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer-container">
      <img src="/images/logo-escola.jpg" alt="Escola do Cerrado" className="footer-logo" />
      <div className="footer-content">
        <div className="footer-icons">
          <a href="mailto:adm.escoladocerrado@gmail.com" className="icon"><FaEnvelope /></a>
          <a href="https://www.instagram.com/escoladocerrado/" target="_blank" rel="noopener noreferrer" className="icon"><FaInstagram /></a>
          <a href="tel:+61999517356" className="icon"><FaPhone /></a>
          <a href="https://www.linkedin.com/company/escola-do-cerrado/" target="_blank" rel="noopener noreferrer" className="icon"><FaLinkedin /></a>
        </div>
        <p className="footer-text">Copyright © 2025 | Created by Struct</p>
      </div>
    </footer>
  );
};

export default Footer;
