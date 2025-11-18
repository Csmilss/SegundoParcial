import { Link } from 'react-router-dom';
import '../styles/Inicio.css';
import portadaNvaCba from '../assets/nva_cba_portada.jpg'; 
import logoNvaCba from '../assets/nva_cba_logo.png';    

function Inicio() {
  return (
    <div className="inicio-container">
      <header className="inicio-header">
        {/* 2. Logo en el header */}
        <img src={logoNvaCba} alt="Logo UTN FRC" className="inicio-logo" /> 
        <h1>Bienvenido</h1>
      </header>

      <section className="inicio-imagen-principal">
        {/* 3. Imagen de la entrada */}
        <img src={portadaNvaCba} alt="Portada Nueva Cordoba" className="inicio-portada" />
      </section>

      <section className="inicio-acciones">
        <p>Comienza explorando los perfiles de la comunidad</p>
        <Link to="/usuarios" className="btn-accion">
          Ver Miembros
        </Link>
      </section>
    </div>
  );
}

export default Inicio;