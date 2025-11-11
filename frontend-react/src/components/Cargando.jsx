import './Cargando.css';

function Cargando() {
  return (
    <div className="cargando-container">
      <div className="bonfire-loading">
        <div className="flame"></div>
        <div className="flame"></div>
        <div className="flame"></div>
      </div>
      <p className="cargando-text">Encendiendo la hoguera...</p>
    </div>
  );
}

export default Cargando;
