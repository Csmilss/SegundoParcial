import { useForm } from 'react-hook-form';
import api from '../services/api.js';
import { useState, useEffect } from 'react';
import { getErrorMessage } from '../utils/errorMessages';
import './FormularioComentario.css';

export default function FormularioComentario({ publicacionId, onComentarioCreado }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [expandido, setExpandido] = useState(false);

  const onSubmit = async (data) => {
    setEnviando(true);
    setMensaje(null);
    
    try {
      // Enviar solo nombre, correo y cuerpo (sin usuarioId)
      const { nombre, correo, cuerpo } = data;
      const response = await api.post(`/publicaciones/${publicacionId}/comentarios`, {
        nombre,
        correo,
        cuerpo
      });
      setMensaje({ tipo: 'exito', texto: `✅ ¡Comentario agregado exitosamente!` });
      reset();
      
      // Notificar al componente padre si existe callback
      if (onComentarioCreado) {
        onComentarioCreado(response.data);
      }
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMensaje(null), 3000);
    } catch (error) {
      const errorInfo = getErrorMessage(error);
      setMensaje({ 
        tipo: 'error', 
        titulo: errorInfo.title,
        texto: errorInfo.message,
        detalle: errorInfo.detail,
        hint: errorInfo.hint
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="formulario-comentario">
      <button 
        type="button"
        className="btn-toggle-comentario-simple"
        onClick={() => setExpandido(!expandido)}
      >
        {expandido ? '▲ Ocultar comentarios' : '▼ Agregar comentario'}
      </button>
      
      {expandido && (
      <form onSubmit={handleSubmit(onSubmit)} className="form-comentario-compacto" noValidate>
        <div className="comentario-inputs-linea">
          <input
            type="text"
            {...register('nombre')}
            placeholder="Nombre"
            disabled={enviando}
          />
          
          <input
            type="text"
            {...register('correo')}
            placeholder="Email"
            disabled={enviando}
          />
        </div>

        <textarea
          rows="2"
          {...register('cuerpo')}
          placeholder="Tu comentario..."
          disabled={enviando}
        />

        {mensaje && (
          <div className={`mensaje-compacto ${mensaje.tipo}`}>
            {mensaje.tipo === 'error' && mensaje.titulo ? (
              <>
                <strong>{mensaje.titulo}</strong>
                <div>{mensaje.detalle}</div>
              </>
            ) : (
              mensaje.texto
            )}
          </div>
        )}

        <button type="submit" className="btn-comentar-compacto" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      )}
    </div>
  );
}
