import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <span className="navbar-icon">🔥⚔️</span>
                    <span className="navbar-title">Soul Society</span>
                </Link>
            </div>
            <ul className="navbar-menu">
                <li className={location.pathname === '/' ? 'active' : ''}>
                    <Link to="/">Inicio</Link>
                </li>
                <li className={location.pathname === '/usuarios' ? 'active' : ''}>
                    <Link to="/usuarios">Usuarios</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
