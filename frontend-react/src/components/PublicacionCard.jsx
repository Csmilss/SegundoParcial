import { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioComentario from './FormularioComentario';
import ModalConfirmacion from './ModalConfirmacion';
import './PublicacionCard.css';

export default function PublicacionCard({ publicacion }) {
  const [expandido, setExpandido] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [cantidadComentarios, setCantidadComentarios] = useState(0);
  const [cargandoComentarios, setCargandoComentarios] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [comentarioAEliminar, setComentarioAEliminar] = useState(null);

  // Cargar cantidad de comentarios al montar
  useEffect(() => {
    const cargarCantidad = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/publicaciones/${publicacion.id}/comentarios`);
        setCantidadComentarios(response.data.length);
      } catch (error) {
        console.error('Error al cargar cantidad de comentarios:', error);
      }
    };
    cargarCantidad();
  }, [publicacion.id]);

  const cargarComentarios = async () => {
    if (comentarios.length === 0 && !cargandoComentarios) {
      setCargandoComentarios(true);
      try {
        const response = await axios.get(`http://localhost:4000/api/publicaciones/${publicacion.id}/comentarios`);
        setComentarios(response.data);
        setCantidadComentarios(response.data.length);
      } catch (error) {
        console.error('Error al cargar comentarios:', error);
      } finally {
        setCargandoComentarios(false);
      }
    }
  };

  const handleToggle = () => {
    if (!expandido) {
      cargarComentarios();
    }
    setExpandido(!expandido);
  };

  const handleComentarioCreado = (nuevoComentario) => {
    setComentarios([...comentarios, nuevoComentario]);
    setCantidadComentarios(cantidadComentarios + 1);
  };

  const handleEliminarComentario = (comentarioId) => {
    setComentarioAEliminar(comentarioId);
    setMostrarModal(true);
  };

  const confirmarEliminacion = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/comentarios/${comentarioAEliminar}`);
      // Actualizar la lista de comentarios
      setComentarios(comentarios.filter(c => c.id !== comentarioAEliminar));
      setCantidadComentarios(cantidadComentarios - 1);
      setMostrarModal(false);
      setComentarioAEliminar(null);
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      setMostrarModal(false);
      setComentarioAEliminar(null);
    }
  };

  const cancelarEliminacion = () => {
    setMostrarModal(false);
    setComentarioAEliminar(null);
  };

  return (
    <article className="publicacion-card">
      <div className="publicacion-header-card">
        <h3>{publicacion.titulo}</h3>
        <button 
          onClick={handleToggle}
          className="btn-toggle"
          title={expandido ? "Ocultar comentarios" : "Ver comentarios"}
        >
          {expandido ? '▲' : '▼'}
        </button>
      </div>
      
      <p className="publicacion-cuerpo">{publicacion.cuerpo}</p>
      
      <div className="publicacion-footer">
        <span className="fecha">
          {new Date(publicacion.createdAt).toLocaleDateString('es-AR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </span>
        <span className="comentarios-count">
          💬 {cantidadComentarios} {cantidadComentarios === 1 ? 'comentario' : 'comentarios'}
        </span>
      </div>

      {expandido && (
        <div className="comentarios-section">
          <div className="comentarios-list">
            {cargandoComentarios ? (
              <p className="cargando-comentarios">Cargando comentarios...</p>
            ) : comentarios.length === 0 ? (
              <p className="sin-comentarios">No hay comentarios aún. ¡Sé el primero!</p>
            ) : (
              comentarios.map(comentario => (
                <div key={comentario.id} className="comentario-item">
                  <div className="comentario-header">
                    <div className="comentario-autor-info">
                      <span className="comentario-autor">{comentario.nombre}</span>
                      <span className="comentario-correo">({comentario.correo})</span>
                    </div>
                    <button 
                      className="btn-eliminar-comentario"
                      onClick={() => handleEliminarComentario(comentario.id)}
                      title="Eliminar comentario"
                    >
                      🗑️
                    </button>
                  </div>
                  <p className="comentario-cuerpo">{comentario.cuerpo}</p>
                  <span className="comentario-fecha">
                    {new Date(comentario.createdAt).toLocaleDateString('es-AR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              ))
            )}
          </div>
          
          <FormularioComentario 
            publicacionId={publicacion.id}
            onComentarioCreado={handleComentarioCreado}
          />
        </div>
      )}

      {mostrarModal && (
        <ModalConfirmacion
          mensaje="¿Estás seguro de que deseas eliminar este comentario? Esta acción no se puede deshacer."
          onConfirmar={confirmarEliminacion}
          onCancelar={cancelarEliminacion}
        />
      )}
    </article>
  );
}
