import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
// 1. Importamos 'post' y el nuevo formulario
import { get, post } from '../services/api.js'; 
import PublicacionForm from '../components/PublicacionForm.jsx'; 
import Cargando from '../components/Cargando.jsx';
import Alerta from '../components/Alerta.jsx';
import '../styles/PublicacionesList.css'; 
import '../styles/PublicacionForm.css'; // 2. Importamos el CSS del form

function Publicaciones() {
  // Estados
  const { id } = useParams(); // ID del usuario
  const [publicaciones, setPublicaciones] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de filtro (igual que antes)
  const [searchParams, setSearchParams] = useSearchParams();
  const filtro = searchParams.get('filtro') || '';
  const orden = searchParams.get('orden') || 'fecha_desc';

  // 3. Nuevos estados para el formulario
  const [showForm, setShowForm] = useState(false);
  const [estaGuardando, setEstaGuardando] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Para forzar recarga

  // Carga de publicaciones
  useEffect(() => {
    const fetchPublicaciones = async () => {
      setLoading(true);
      setError(null);
      
      const resultado = await get(`/usuarios/${id}/publicaciones`);
      setLoading(false);

      if (resultado.error) {
        setError(resultado.mensaje);
      } else {
        setPublicaciones(resultado);
      }
    };
    fetchPublicaciones();
  }, [id, refreshKey]); // 4. Añadimos refreshKey como dependencia

  // Filtrado (igual que antes)
  const publicacionesFiltradas = useMemo(() => {
    let pubs = [...publicaciones]; 
    if (filtro) {
      pubs = pubs.filter((p) =>
        p.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        p.cuerpo.toLowerCase().includes(filtro.toLowerCase())
      );
    }
    switch (orden) {
      case 'fecha_asc':
        pubs.sort((a, b) => a.id - b.id); 
        break;
      case 'titulo_az':
        pubs.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'titulo_za':
        pubs.sort((a, b) => b.titulo.localeCompare(a.titulo));
        break;
      case 'fecha_desc':
      default:
        pubs.sort((a, b) => b.id - a.id); 
        break;
    }
    return pubs;
  }, [publicaciones, filtro, orden]);

  // Handlers de filtro (igual que antes)
  const handleFiltroChange = (e) => {
    setSearchParams({ filtro: e.target.value, orden });
  };
  const handleOrdenChange = (e) => {
    setSearchParams({ filtro, orden: e.target.value });
  };

  // 5. Nueva función para guardar la publicación
  const handleSavePublicacion = async (data, limpiarForm) => {
    setEstaGuardando(true);
    setError(null);

    // Añadimos el usuarioId (que lo tenemos de useParams)
    const dataConUsuario = { ...data, usuarioId: id };

    const resultado = await post('/publicaciones', dataConUsuario);
    setEstaGuardando(false);

    if (resultado.error) {
      setError(resultado.mensaje); // Mostramos error
    } else {
      // Éxito
      setShowForm(false); // Ocultamos el form
      limpiarForm(); // Limpiamos los campos
      setRefreshKey(k => k + 1); // Forzamos la recarga del useEffect
    }
  };


  // Renderizado
  if (loading && refreshKey === 0) return <Cargando />; // Solo el "Cargando" inicial

  return (
    <div className="publicaciones-container">
      <h2>Publicaciones del Vecino (ID: {id})</h2>

      {/* 6. Alerta de Errores (ahora sirve para GET y POST) */}
      <Alerta mensaje={error} />

      {/* 7. Lógica para mostrar Formulario o Botón "Crear" */}
      {showForm ? (
        <PublicacionForm 
          onGuardar={handleSavePublicacion}
          onCancelar={() => setShowForm(false)}
          estaCargando={estaGuardando}
        />
      ) : (
        <div className="nuevo-post-control">
          <button className="btn-nuevo" onClick={() => setShowForm(true)}>
            Crear Nuevo Post
          </button>
        </div>
      )}

      {/* Controles de Filtro (igual que antes) */}
      <div className="filtros-controles">
        <input
          type="text"
          placeholder="Filtrar por título o cuerpo..."
          className="filtro-input"
          value={filtro}
          onChange={handleFiltroChange}
        />
        <select
          className="orden-select"
          value={orden}
          onChange={handleOrdenChange}
        >
          <option value="fecha_desc">Más recientes primero</option>
          <option value="fecha_asc">Más antiguos primero</option>
          <option value="titulo_az">Título (A-Z)</option>
          <option value="titulo_za">Título (Z-A)</option>
        </select>
      </div>
      
      {/* 8. Feedback de carga (para recargas) */}
      {loading && refreshKey > 0 && <Cargando />}

      {/* Lista de Publicaciones (igual que antes) */}
      <div className="publicaciones-lista">
        {!loading && publicacionesFiltradas.length === 0 ? (
          <div className="alerta-info">Sin publicaciones para mostrar</div>
        ) : (
          publicacionesFiltradas.map((pub) => (
            <div key={pub.id} className="publicacion-item">
              <h3>
                <Link to={`/publicaciones/${pub.id}`} className="publicacion-link">
                  {pub.titulo}
                </Link>
              </h3>
              <p>{pub.cuerpo.substring(0, 150)}...</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Publicaciones;