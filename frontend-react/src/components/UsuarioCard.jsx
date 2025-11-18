import { Link } from 'react-router-dom';
import './UsuarioCard.css';

function UsuarioCard({ usuario }) {
    return (
        <div className="usuario-card">
            <div className="usuario-avatar">
                {usuario.nombre.charAt(0).toUpperCase()}
            </div>
            <div className="usuario-info">
                <h3 className="usuario-nombre">{usuario.nombre}</h3>
                <p className="usuario-correo">✉️ {usuario.correo}</p>
                <p className="usuario-ciudad">📍 {usuario.ciudad}</p>
            </div>
            <Link 
                to={`/usuarios/${usuario.id}/publicaciones`} 
                className="btn-publicaciones"
            >
                📜 Ver Crónicas de Batalla
            </Link>
        </div>
    );
}

export default UsuarioCard;
