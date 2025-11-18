import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { get, post, del } from '../services/api.js'; // Importamos 'post' y 'del'
import Cargando from '../components/Cargando.jsx';
import Alerta from '../components/Alerta.jsx';
import ComentarioForm from '../components/ComentarioForm.jsx'; // 1. Importar el form
import '../styles/PublicacionDetalle.css';

function PublicacionDetalle() {
  const { id } = useParams(); // ID de la Publicación

  // Estados
  const [publicacion, setPublicacion] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado para bloquear el form mientras se envía
  const [estaGuardando, setEstaGuardando] = useState(false);

  // effecto de carga de la publicación y sus comentarios
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [resPost, resComentarios] = await Promise.all([
          get(`/publicaciones/${id}`),
          get(`/publicaciones/${id}/comentarios`)
        ]);

        if (resPost.error) throw new Error(resPost.mensaje);

        setPublicacion(resPost);
        setComentarios(resComentarios.error ? [] : resComentarios);
        if (resComentarios.error) setError('No se pudieron cargar los comentarios.');

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // crear comentario (lógica optimista)
  const handleGuardarComentario = async (data, limpiarForm) => {
    setEstaGuardando(true);
    setError(null);

    // 1. Creación Optimista: Creamos un ID falso temporal
    const idTemporal = Date.now(); 
    const nuevoComentario = { ...data, id: idTemporal };
    
    // 2. Actualización Optimista: Añadimos el comentario a la lista YA
    setComentarios([nuevoComentario, ...comentarios]);
    limpiarForm(); // Limpiamos el form

    // 3. Llamada Real a la API (en segundo plano)
    const url = `/publicaciones/${id}/comentarios`;
    const resultado = await post(url, data); // 'post' ya maneja errores
    
    setEstaGuardando(false);

    // 4. Revertir si falla
    if (resultado.error) {
      setError(resultado.mensaje); // Mostramos alerta
      // Revertimos: filtramos la lista para quitar el comentario temporal
      setComentarios(comentariosActuales => 
        comentariosActuales.filter(c => c.id !== idTemporal)
      );
    } else {
      // 5. Confirmar: Reemplazamos el comentario temporal por el real (con el ID de la BD)
      setComentarios(comentariosActuales =>
        comentariosActuales.map(c => 
          c.id === idTemporal ? resultado : c
        )
      );
    }
  };

  // borrar comentario (lógica optimista)
  const handleBorrarComentario = async (idComentario) => {
    setError(null);
    
    // 1. Guardamos la lista actual por si hay que revertir
    const comentariosOriginales = [...comentarios];

    // 2. Actualización Optimista: Quitamos el comentario YA
    setComentarios(comentariosActuales =>
      comentariosActuales.filter(c => c.id !== idComentario)
    );

    // 3. Llamada Real a la API
    const url = `/comentarios/${idComentario}`;
    const resultado = await del(url); // 'del' ya maneja errores

    // 4. Revertir si falla
    if (resultado.error) {
      setError(resultado.mensaje); // Mostramos alerta
      setComentarios(comentariosOriginales); // Restauramos la lista original
    }
    // Si tiene éxito, no hacemos nada (ya estaba borrado)
  };


  // renderizado
  if (loading) return <Cargando />;
  if (error && !publicacion) return <Alerta mensaje={error} />;

  return (
    <div className="detalle-container">
      {/* SECCIÓN 1: La Publicación */}
      <article className="detalle-post">
        <h1>{publicacion.titulo}</h1>
        <p className="post-cuerpo">{publicacion.cuerpo}</p>
        <Link to={`/usuarios/${publicacion.usuarioId}/publicaciones`}>
          &laquo; Volver a publicaciones
        </Link>
      </article>

      {/* SECCIÓN 2: Formulario de Comentarios */}
      <ComentarioForm onGuardar={handleGuardarComentario} estaCargando={estaGuardando} />

      {/* SECCIÓN 3: Los Comentarios */}
      <section className="detalle-comentarios">
        <h2>Comentarios</h2>

        {/* Alerta para errores de borrado/creado */}
        <Alerta mensaje={error} /> 

        {!loading && comentarios.length === 0 && (
          <div className="alerta-info">Sin comentarios todavía</div>
        )}

        <div className="lista-comentarios">
          {comentarios.map((com) => (
            <div key={com.id} className="comentario-item">
              <button 
                className="btn-borrar"
                onClick={() => handleBorrarComentario(com.id)}
                title="Eliminar comentario"
              >
                &times;
              </button>
              <strong>{com.nombre}</strong> ({com.correo})
              <p>{com.cuerpo}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PublicacionDetalle;