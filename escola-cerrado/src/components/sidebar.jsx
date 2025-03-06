import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/CRUD/funcionarios">Colaboradores</Link>
      <Link to="/CRUD/cases">Cases de Sucesso</Link>
    </div>
  );
};

export default Sidebar;
