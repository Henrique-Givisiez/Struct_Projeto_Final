import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100); // Pequeno delay para garantir que a navegação ocorreu
    } else {
      scrollToSection(sectionId);
    }
  };

  const scrollToSection = (id) => {
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <header className="header">
      <img src="/images/logo-escola.jpg" alt="Escola Cerrado" className="logo-img" onClick={() => navigate("/")}/>
      <nav className="nav">
        <button className="nav-link" onClick={() => handleNavigation("quem-somos")}>Quem somos</button>
        <button className="nav-link" onClick={() => handleNavigation("nosso-trabalho")}>Nosso Trabalho</button>
        <button className="nav-link" onClick={() => handleNavigation("equipe")}>Equipe</button>
        <button className="nav-link" onClick={() => handleNavigation("contato")}>Contato</button>
      </nav>
      <button className="btn-entrar" onClick={() => navigate("/login")}>Entrar</button>
    </header>
  );
};

export default Header;
