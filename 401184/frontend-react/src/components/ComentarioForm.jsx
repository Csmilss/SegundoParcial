import { useForm } from 'react-hook-form';
import '../styles/ComentarioForm.css';

// onGuardar: La función que se llama cuando el form es válido
// estaCargando: Un 'prop' para deshabilitar el botón mientras se guarda
function ComentarioForm({ onGuardar, estaCargando = false }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    // data = { nombre: "...", correo: "...", cuerpo: "..." }
    onGuardar(data, () => reset()); // Llama a la func. padre y le pasa un "callback" para limpiar
  };

  return (
    <form className="comentario-form" onSubmit={handleSubmit(onSubmit)}>
      <h4>Agregar un Comentario</h4>
      
      {/* Campo Nombre */}
      <div className="form-group">
        <label>Nombre:</label>
        <input 
          type="text"
          {...register("nombre", { 
            required: "El nombre es requerido",
            minLength: { value: 3, message: "Mínimo 3 caracteres" }
          })} 
        />
        {errors.nombre && <span className="error-msg">{errors.nombre.message}</span>}
      </div>

      {/* Campo Correo */}
      <div className="form-group">
        <label>Correo:</label>
        <input 
          type="email"
          {...register("correo", { 
            required: "El correo es requerido",
            pattern: { value: /^\S+@\S+$/i, message: "Correo inválido" }
          })} 
        />
        {errors.correo && <span className="error-msg">{errors.correo.message}</span>}
      </div>

      {/* Campo Cuerpo */}
      <div className="form-group">
        <label>Comentario:</label>
        <textarea 
          rows="3"
          {...register("cuerpo", { 
            required: "El comentario es requerido" 
          })} 
        ></textarea>
        {errors.cuerpo && <span className="error-msg">{errors.cuerpo.message}</span>}
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-guardar" disabled={estaCargando}>
          {estaCargando ? "Enviando..." : "Enviar Comentario"}
        </button>
      </div>
    </form>
  );
}
export default ComentarioForm;