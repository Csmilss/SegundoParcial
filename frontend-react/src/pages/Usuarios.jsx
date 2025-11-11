import { useState, useEffect } from 'react';
import axios from 'axios';
import Cargando from '../components/Cargando';
import UsuarioCard from '../components/UsuarioCard';
import FormularioUsuario from '../components/FormularioUsuario';
import { getErrorMessage } from '../utils/errorMessages';
import './Usuarios.css';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/usuarios');
      setUsuarios(response.data);
      setLoading(false);
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      setError(err.response?.data?.mensaje || 'Error al cargar usuarios');
      setErrorInfo(errorMsg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleUsuarioCreado = (nuevoUsuario) => {
    setUsuarios([...usuarios, nuevoUsuario]);
  };

  if (loading) {
    return <Cargando />;
  }

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
    <div className="usuarios-container">
      <div className="usuarios-header">
        <h1>⚔️ Cazadores de Almas</h1>
        <p className="subtitle">Guerreros de Soul Society</p>
        <p className="usuarios-count">{usuarios.length} guerreros registrados</p>
      </div>

      <FormularioUsuario onUsuarioCreado={handleUsuarioCreado} />
      
      <div className="usuarios-grid">
        {usuarios.length === 0 ? (
          <p className="no-usuarios">No hay guerreros registrados aún</p>
        ) : (
          usuarios.map(usuario => (
            <UsuarioCard key={usuario.id} usuario={usuario} />
          ))
        )}
      </div>
    </div>
  );
}

export default Usuarios;
