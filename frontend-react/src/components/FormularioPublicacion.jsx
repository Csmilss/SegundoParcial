import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getErrorMessage } from '../utils/errorMessages';
import './FormularioPublicacion.css';

export default function FormularioPublicacion({ onPublicacionCreada }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
  const [expandido, setExpandido] = useState(false);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      } finally {
        setCargandoUsuarios(false);
      }
    };
    cargarUsuarios();
  }, []);

  const onSubmit = async (data) => {
    setEnviando(true);
    setMensaje(null);
    
    try {
      const response = await axios.post('http://localhost:4000/api/publicaciones', {
        ...data,
        usuarioId: parseInt(data.usuarioId)
      });
      setMensaje({ tipo: 'exito', texto: `✅ ¡Crónica "${data.titulo}" publicada exitosamente!` });
      reset();
      
      // Notificar al componente padre si existe callback
      if (onPublicacionCreada) {
        onPublicacionCreada(response.data);
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
          <h2>📜 Crear Nueva Crónica</h2>
          <p className="formulario-subtitulo">Comparte tu historia en Soul Society</p>
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
          <label htmlFor="usuarioId">⚔️ Guerrero</label>
          <select
            id="usuarioId"
            {...register('usuarioId', { 
              required: 'Debes seleccionar un guerrero'
            })}
            disabled={enviando || cargandoUsuarios}
          >
            <option value="">-- Selecciona un guerrero --</option>
            {usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre} ({usuario.correo})
              </option>
            ))}
          </select>
          {errors.usuarioId && <span className="error-message">{errors.usuarioId.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="titulo">🗡️ Título de la Crónica</label>
          <input
            id="titulo"
            type="text"
            {...register('titulo', { 
              required: 'El título es obligatorio',
              minLength: { value: 5, message: 'El título debe tener al menos 5 caracteres' }
            })}
            placeholder="Ej: Mi épica batalla contra el jefe final"
            disabled={enviando}
          />
          {errors.titulo && <span className="error-message">{errors.titulo.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cuerpo">📖 Historia</label>
          <textarea
            id="cuerpo"
            rows="6"
            {...register('cuerpo', { 
              required: 'El contenido es obligatorio',
              minLength: { value: 10, message: 'El contenido debe tener al menos 10 caracteres' }
            })}
            placeholder="Cuenta tu historia épica..."
            disabled={enviando}
          />
          {errors.cuerpo && <span className="error-message">{errors.cuerpo.message}</span>}
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

        <button type="submit" className="btn-submit" disabled={enviando || cargandoUsuarios}>
          {enviando ? '🔥 Escribiendo...' : '📜 Publicar Crónica'}
        </button>
      </form>
      )}
    </div>
  );
}
