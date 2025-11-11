import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cargando from '../components/Cargando';
import FormularioPublicacion from '../components/FormularioPublicacion';
import PublicacionCard from '../components/PublicacionCard';
import { getErrorMessage } from '../utils/errorMessages';
import './Publicaciones.css';

function Publicaciones() {
  const { id } = useParams();
  const [publicaciones, setPublicaciones] = useState([]);
  const [publicacionesFiltradas, setPublicacionesFiltradas] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);
  const [filtroTitulo, setFiltroTitulo] = useState('');

  const fetchData = async () => {
    try {
      // Obtener datos del usuario
      const usuarioResponse = await axios.get(`http://localhost:4000/api/usuarios/${id}`);
      setUsuario(usuarioResponse.data);

      // Obtener publicaciones del usuario
      const publicacionesResponse = await axios.get(`http://localhost:4000/api/usuarios/${id}/publicaciones`);
      setPublicaciones(publicacionesResponse.data);
      setPublicacionesFiltradas(publicacionesResponse.data);
      setLoading(false);
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      setError(err.response?.data?.mensaje || 'Error al cargar los datos');
      setErrorInfo(errorMsg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handlePublicacionCreada = (nuevaPublicacion) => {
    // Recargar datos para mostrar la nueva publicación
    fetchData();
  };

  // Filtrar publicaciones por título (local)
  useEffect(() => {
    if (filtroTitulo.trim() === '') {
      setPublicacionesFiltradas(publicaciones);
    } else {
      const filtradas = publicaciones.filter(pub =>
        pub.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
      );
      setPublicacionesFiltradas(filtradas);
    }
  }, [filtroTitulo, publicaciones]);

  if (loading) return <Cargando />;

  if (error && errorInfo) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>{errorInfo.title}</h2>
          <p className="error-message-soul">{errorInfo.message}</p>
          <p className="error-detail">{errorInfo.detail}</p>
          <p className="error-hint">{errorInfo.hint}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="publicaciones-container">
      {usuario && (
        <div className="usuario-header">
          <div className="usuario-avatar-large">
            {usuario.nombre.charAt(0).toUpperCase()}
          </div>
          <div className="usuario-info">
            <h1>{usuario.nombre}</h1>
            <p>📍 {usuario.ciudad}</p>
            <p>✉️ {usuario.correo}</p>
          </div>
        </div>
      )}

      <FormularioPublicacion onPublicacionCreada={handlePublicacionCreada} />

      <div className="filtro-section">
        <h2>Crónicas de Batalla ({publicacionesFiltradas.length})</h2>
        <div className="filtro-input-container">
          <input
            type="text"
            placeholder="🔍 Buscar por título..."
            value={filtroTitulo}
            onChange={(e) => setFiltroTitulo(e.target.value)}
            className="filtro-input"
          />
          {filtroTitulo && (
            <button 
              onClick={() => setFiltroTitulo('')} 
              className="btn-limpiar"
              title="Limpiar filtro"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {publicacionesFiltradas.length === 0 ? (
        <div className="empty-state">
          <p>
            {publicaciones.length === 0 
              ? 'Este guerrero aún no tiene crónicas de batalla' 
              : `No se encontraron crónicas con "${filtroTitulo}"`}
          </p>
        </div>
      ) : (
        <div className="publicaciones-list">
          {publicacionesFiltradas.map(publicacion => (
            <PublicacionCard key={publicacion.id} publicacion={publicacion} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Publicaciones;
