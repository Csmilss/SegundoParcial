import { Link } from 'react-router-dom';
import '../styles/UsuarioCard.css'; 

function UsuarioCard({ usuario }) {
  // Recibimos un 'usuario' por props
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{usuario.nombre}</h5>
        <p className="card-text">Correo: {usuario.correo}</p>
        <p className="card-text">Ciudad: {usuario.ciudad}</p>
        <Link 
          to={`/usuarios/${usuario.id}/publicaciones`} 
          className="card-button"
        >
          Ver Publicaciones
        </Link>
      </div>
    </div>
  );
}
export default UsuarioCard;