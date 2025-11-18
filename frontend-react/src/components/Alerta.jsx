import '../styles/Alerta.css';

function Alerta({ mensaje }) {
  if (!mensaje) return null; // Si no hay mensaje, no muestra nada

  return (
    <div className="alerta-error">
      <strong>Error:</strong> {mensaje}
    </div>
  );
}
export default Alerta;