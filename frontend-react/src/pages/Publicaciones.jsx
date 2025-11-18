import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { get } from '../services/api.js';
import Cargando from '../components/Cargando.jsx';
import Alerta from '../components/Alerta.jsx';
import '../styles/PublicacionesList.css'; 
import { Link } from 'react-router-dom';

function Publicaciones() {
  // estados
  const { id } = useParams(); // ID del usuario (de /usuarios/:id/...)
  const [publicaciones, setPublicaciones] = useState([]); // Lista original
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Hook para sincronizar con la URL (?filtro=...&orden=...)
  const [searchParams, setSearchParams] = useSearchParams();

  // Leemos los valores de la URL (o usamos '' y 'fecha_desc' por defecto)
  const filtro = searchParams.get('filtro') || '';
  const orden = searchParams.get('orden') || 'fecha_desc';

  // carga de publicaciones del usuario
  useEffect(() => {
    const fetchPublicaciones = async () => {
      setLoading(true);
      setError(null);
      // 2. Hacemos UNA SOLA petición a la API
      const resultado = await get(`/usuarios/${id}/publicaciones`);
      setLoading(false);

      if (resultado.error) {
        setError(resultado.mensaje);
      } else {
        setPublicaciones(resultado);
      }
    };
    fetchPublicaciones();
  }, [id]); // Depende solo de 'id'

  // filtrado y orden (en el cliente)
  // 3. Usamos useMemo para optimizar
  const publicacionesFiltradas = useMemo(() => {
    let pubs = [...publicaciones]; // Copiamos la lista

    // 3.1. Aplicar Filtro (en cliente)
    if (filtro) {
      pubs = pubs.filter((p) =>
        p.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        p.cuerpo.toLowerCase().includes(filtro.toLowerCase())
      );
    }

    // 3.2. Aplicar Orden (en cliente)
    switch (orden) {
      case 'fecha_asc':
        pubs.sort((a, b) => a.id - b.id); // Asumimos id es cronológico
        break;
      case 'titulo_az':
        pubs.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'titulo_za':
        pubs.sort((a, b) => b.titulo.localeCompare(a.titulo));
        break;
      case 'fecha_desc':
      default:
        pubs.sort((a, b) => b.id - a.id); // Por defecto
        break;
    }
    return pubs;
  }, [publicaciones, filtro, orden]); // 4. Recalcula si cambia esto

  // handlers para cambios en filtro y orden
  const handleFiltroChange = (e) => {
    setSearchParams({ filtro: e.target.value, orden });
  };

  const handleOrdenChange = (e) => {
    setSearchParams({ filtro, orden: e.target.value });
  };

  // renderizado
  if (loading) return <Cargando />;

  return (
    <div className="publicaciones-container">
      <h2>Publicaciones del Usuario {id}</h2>

      <Alerta mensaje={error} />

      {/* 5. Controles de Filtro y Orden */}
      <div className="filtros-controles">
        <input
          type="text"
          placeholder="Filtrar por título o cuerpo..."
          className="filtro-input"
          value={filtro} // Controlado por la URL
          onChange={handleFiltroChange}
        />
        <select
          className="orden-select"
          value={orden} // Controlado por la URL
          onChange={handleOrdenChange}
        >
          <option value="fecha_desc">Más recientes primero</option>
          <option value="fecha_asc">Más antiguos primero</option>
          <option value="titulo_az">Título (A-Z)</option>
          <option value="titulo_za">Título (Z-A)</option>
        </select>
      </div>

      {/* 6. Lista de Publicaciones */}
      <div className="publicaciones-lista">
        {!loading && publicacionesFiltradas.length === 0 ? (
          <div className="alerta-info">Sin publicaciones para mostrar</div>
        ) : (
          publicacionesFiltradas.map((pub) => (
            <div key={pub.id} className="publicacion-item">
              {/* Convertimos el h3 en un Link */}
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