import { Routes, Route } from 'react-router-dom';

// Importar componentes y páginas
import Navbar from './components/Navbar.jsx';
import Inicio from './pages/Inicio.jsx';
import Usuarios from './pages/Usuarios.jsx';
import Publicaciones from './pages/Publicaciones.jsx';
import PublicacionDetalle from './pages/PublicacionDetalle.jsx';
import Error404 from './pages/Error404.jsx';
import Footer from './components/Footer.jsx';
import './styles/App.css';

function App() {
  return (
    <>
      <Navbar /> 

      {/* Definir el "mapa" de rutas */}
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/:id/publicaciones" element={<Publicaciones />} />
          <Route path="/publicaciones/:id" element={<PublicacionDetalle />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
export default App