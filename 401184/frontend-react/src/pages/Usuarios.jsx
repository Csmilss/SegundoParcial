import { useState, useEffect } from 'react';
// 1. Importamos 'get' y 'post'
import { get, post } from '../services/api.js'; 
import UsuarioCard from '../components/UsuarioCard.jsx';
import Cargando from '../components/Cargando.jsx';
import Alerta from '../components/Alerta.jsx';
import UsuarioForm from '../components/UsuarioForm.jsx'; // 2. Importamos el Form
import '../styles/UsuariosList.css'; 

function Usuarios() {
  // --- Estados de Paginación ---
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const LIMITE_POR_PAGINA = 5;

  // --- Estados del Formulario ---
  const [showForm, setShowForm] = useState(false); // 3. Estado para mostrar/ocultar form
  const [estaGuardando, setEstaGuardando] = useState(false);
  
  // 4. Estado para forzar la recarga
  const [refreshKey, setRefreshKey] = useState(0);

  // --- EFECTO DE CARGA (Depende de 'pagina' y 'refreshKey') ---
  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      setError(null);
      
      const url = `/usuarios?pagina=${pagina}&limite=${LIMITE_POR_PAGINA}`;
      const resultado = await get(url);
      
      setLoading(false);

      if (resultado.error) {
        setError(resultado.mensaje);
        setUsuarios([]);
        setTotalPaginas(0);
      } else {
        setUsuarios(resultado.items);
        setTotalPaginas(Math.ceil(resultado.total / LIMITE_POR_PAGINA));
      }
    };

    fetchUsuarios();
  }, [pagina, refreshKey]); // 5. Se recarga si cambia la página O si forzamos

  // --- LÓGICA PARA CREAR USUARIO ---
  const handleSaveUsuario = async (data, limpiarForm) => {
    setEstaGuardando(true);
    setError(null);

    const resultado = await post('/usuarios', data); // Llama a la API

    setEstaGuardando(false);

    if (resultado.error) {
      setError(resultado.mensaje); // Muestra error con Alerta
    } else {
      // ÉXITO: Oculta el form y fuerza la recarga
      setShowForm(false);
      limpiarForm();
      // 6. Forzamos la recarga de la lista
      // Si estamos en la pág 1, la recarga. Si no, vuelve a la pág 1.
      if (pagina !== 1) {
        setPagina(1); 
      } else {
        setRefreshKey(key => key + 1); // Dispara el useEffect
      }
    }
  };

  // --- RENDERIZADO ---
  return (
    <div className="usuarios-container">
      <h2>Lista de Usuarios</h2>

      {/* 7. Formulario o Botón "Nuevo Usuario" */}
      {showForm ? (
        <UsuarioForm 
          onSave={handleSaveUsuario} 
          onCancel={() => setShowForm(false)} 
          estaCargando={estaGuardando} // Pasa el estado de carga al form
        />
      ) : (
        <div className="nuevo-usuario-control">
          <button className="btn-nuevo" onClick={() => setShowForm(true)}>
            Nuevo Usuario
          </button>
        </div>
      )}
      
      <hr style={{ margin: '20px 0' }} />

      {/* 8. Alerta para errores (¡ahora sirve para GET y POST!) */}
      <Alerta mensaje={error} />

      {/* 9. Estado de Carga */}
      {loading && <Cargando />}

      {/* 10. Estado Vacío */}
      {!loading && !error && usuarios.length === 0 && (
        <div className="alerta-info">Sin usuarios para mostrar</div>
      )}

      {/* 11. Lista Paginada (igual que antes) */}
      {!loading && !error && usuarios.length > 0 && (
        <>
          <div className="paginacion-controles">
            <button 
              onClick={() => setPagina(pagina - 1)} 
              disabled={pagina === 1}
            >
              &laquo; Anterior
            </button>
            <span>Página {pagina} de {totalPaginas}</span>
            <button 
              onClick={() => setPagina(pagina + 1)} 
              disabled={pagina >= totalPaginas}
            >
              Siguiente &raquo;
            </button>
          </div>

          <div className="usuarios-grid">
            {usuarios.map((usuario) => (
              <UsuarioCard key={usuario.id} usuario={usuario} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Usuarios;