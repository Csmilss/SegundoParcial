import { Link } from 'react-router-dom';
import '../styles/Inicio.css';

// 1. Importar las imágenes
import entradaFrc from '../assets/utn_frc_entrada.jpg'; 
import logoFrc from '../assets/utn_frc_logo.png';    

function Inicio() {
  return (
    <div className="inicio-container">
      <header className="inicio-header">
        {/* 2. Logo en el header */}
        <img src={logoFrc} alt="Logo UTN FRC" className="inicio-logo" /> 
        <h1>Bienvenido a FRC Conecta</h1>
        <p>
          La red social interna de la UTN Regional Córdoba.
        </p>
      </header>

      <section className="inicio-imagen-principal">
        {/* 3. Imagen de la entrada */}
        <img src={entradaFrc} alt="Entrada UTN FRC" className="inicio-portada" />
      </section>

      <section className="inicio-contenido">
        <p>
          Este proyecto (Parcial 2 DDS) conecta a los usuarios de nuestra facultad.
        </p>
        <ul>
          <li>Un **Backend** (API RESTful) creado con Node.js, Express y Sequelize.</li>
          <li>Un **Frontend** (SPA) creado con React y Vite.</li>
        </ul>
      </section>

      <section className="inicio-acciones">
        <p>Comienza explorando los perfiles de la comunidad:</p>
        <Link to="/usuarios" className="btn-accion">
          Ver Miembros
        </Link>
      </section>
    </div>
  );
}

export default Inicio;