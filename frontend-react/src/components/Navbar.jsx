import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink className="navbar-brand" to="/">
          Nueva Cordoba Conecta
        </NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/usuarios">
              Usuarios
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;