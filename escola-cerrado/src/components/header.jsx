import "./header.css"; // Importa o CSS

const Header = () => {
  return (
    <header className="header">
      <img src="/images/logo-escola.jpg" alt="Escola Cerrado" className="logo-img" />
      <nav className="nav">
        <a href="#quem-somos" className="nav-link">Quem somos</a>
        <a href="#nosso-trabalho" className="nav-link">Nosso Trabalho</a>
        <a href="#equipe" className="nav-link">Equipe</a>
        <a href="#contato" className="nav-link">Contato</a>
      </nav>
      <button className="btn-entrar">Entrar</button>
    </header>
  );
};

export default Header;
