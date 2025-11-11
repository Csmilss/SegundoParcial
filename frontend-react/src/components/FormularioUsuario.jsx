import { useForm } from 'react-hook-form';
import api from '../services/api.js';
import { useState } from 'react';
import { getErrorMessage } from '../utils/errorMessages';
import './FormularioUsuario.css';

export default function FormularioUsuario({ onUsuarioCreado }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [expandido, setExpandido] = useState(false);

  const onSubmit = async (data) => {
    setEnviando(true);
    setMensaje(null);
    
    try {
      const response = await api.post('/usuarios', data);
      setMensaje({ tipo: 'exito', texto: `✅ ¡Guerrero ${data.nombre} registrado exitosamente!` });
      reset();
      
      // Notificar al componente padre si existe callback
      if (onUsuarioCreado) {
        onUsuarioCreado(response.data);
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
    <div className="formulario-container">
      <div className="formulario-header" onClick={() => setExpandido(!expandido)} style={{ cursor: 'pointer' }}>
        <div>
          <h2>⚔️ Registrar Nuevo Guerrero</h2>
          <p className="formulario-subtitulo">Únete a la Soul Society</p>
        </div>
        <button 
          type="button"
          className="btn-toggle-form"
          title={expandido ? "Ocultar formulario" : "Mostrar formulario"}
        >
          {expandido ? '▲' : '▼'}
        </button>
      </div>
      
      {expandido && (
      <form onSubmit={handleSubmit(onSubmit)} className="formulario">
        <div className="form-group">
          <label htmlFor="nombre">🗡️ Nombre del Guerrero</label>
          <input
            id="nombre"
            type="text"
            {...register('nombre', { 
              required: 'El nombre es obligatorio',
              minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' }
            })}
            placeholder="Ej: The Dragon Slayer"
            disabled={enviando}
          />
          {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="correo">📧 Correo Electrónico</label>
          <input
            id="correo"
            type="email"
            {...register('correo', { 
              required: 'El correo es obligatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Correo electrónico inválido'
              }
            })}
            placeholder="guerrero@soulsociety.com"
            disabled={enviando}
          />
          {errors.correo && <span className="error-message">{errors.correo.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="ciudad">🏰 Ciudad</label>
          <input
            id="ciudad"
            type="text"
            {...register('ciudad', { 
              required: 'La ciudad es obligatoria',
              minLength: { value: 2, message: 'La ciudad debe tener al menos 2 caracteres' }
            })}
            placeholder="Ej: Lordran"
            disabled={enviando}
          />
          {errors.ciudad && <span className="error-message">{errors.ciudad.message}</span>}
        </div>

        {mensaje && (
          <div className={`mensaje ${mensaje.tipo}`}>
            {mensaje.tipo === 'error' && mensaje.titulo ? (
              <>
                <div className="mensaje-titulo">{mensaje.titulo}</div>
                <div className="mensaje-texto">{mensaje.texto}</div>
                <div className="mensaje-detalle">{mensaje.detalle}</div>
                {mensaje.hint && <div className="mensaje-hint">{mensaje.hint}</div>}
              </>
            ) : (
              mensaje.texto
            )}
          </div>
        )}

        <button type="submit" className="btn-submit" disabled={enviando}>
          {enviando ? '🔥 Forjando...' : '⚔️ Registrar Guerrero'}
        </button>
      </form>
      )}
    </div>
  );
}