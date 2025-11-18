import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink className="navbar-brand" to="/">
          Mini-Red Social
        </NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              FRC Conecta
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