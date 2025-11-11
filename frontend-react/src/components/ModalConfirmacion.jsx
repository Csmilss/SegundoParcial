import './ModalConfirmacion.css';

export default function ModalConfirmacion({ mensaje, onConfirmar, onCancelar }) {
  return (
    <div className="modal-overlay" onClick={onCancelar}>
      <div className="modal-confirmacion" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>⚔️ Confirmar Acción</h3>
        </div>
        <div className="modal-body">
          <p>{mensaje}</p>
        </div>
        <div className="modal-footer">
          <button className="btn-modal-cancelar" onClick={onCancelar}>
            Cancelar
          </button>
          <button className="btn-modal-confirmar" onClick={onConfirmar}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
