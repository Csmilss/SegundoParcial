import '../styles/Footer.css'; 

function Footer() {
  // Obtenemos el año actual automáticamente
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {currentYear} FRC Conecta - Todos los derechos reservados.</p>
        <p>Parcial 2 - Desarrollo de Software - UTN FRC</p>
      </div>
    </footer>
  );
}

export default Footer;