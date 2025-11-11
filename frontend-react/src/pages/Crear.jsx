import FormularioUsuario from '../components/FormularioUsuario';
import FormularioPublicacion from '../components/FormularioPublicacion';
import { useNavigate } from 'react-router-dom';
import './Crear.css';

function Crear() {
  const navigate = useNavigate();

  const handleUsuarioCreado = () => {
    setTimeout(() => {
      navigate('/usuarios');
    }, 2000);
  };

  const handlePublicacionCreada = () => {
    // Mensaje de éxito ya se muestra en el componente
  };

  return (
    <div className="crear-container">
      <div className="crear-header">
        <h1>✍️ Crear Contenido</h1>
        <p className="subtitle">Expande la Soul Society</p>
      </div>

      <div className="formularios-grid">
        <div className="formulario-wrapper">
          <FormularioUsuario onUsuarioCreado={handleUsuarioCreado} />
        </div>
        <div className="formulario-wrapper">
          <FormularioPublicacion onPublicacionCreada={handlePublicacionCreada} />
        </div>
      </div>
    </div>
  );
}

export default Crear;
