import { useForm } from 'react-hook-form';
import '../styles/PublicacionForm.css'; // Crearemos este CSS en el siguiente paso

// onGuardar: La función que se llama cuando el form es válido
// onCancelar: La función para cerrar el formulario
// estaCargando: Un 'prop' para deshabilitar el botón mientras se guarda
function PublicacionForm({ onGuardar, onCancelar, estaCargando = false }) {
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    // data = { titulo: "...", cuerpo: "..." }
    onGuardar(data, () => reset()); // Llama a la func. padre y le pasa un "callback" para limpiar
  };

  return (
    <form className="publicacion-form" onSubmit={handleSubmit(onSubmit)}>
      <h4>Crear Nueva Publicación</h4>
      
      {/* Campo Titulo */}
      <div className="form-group">
        <label>Título:</label>
        <input 
          type="text"
          {...register("titulo", { 
            required: "El título es requerido",
            minLength: { value: 5, message: "Mínimo 5 caracteres" }
          })} 
        />
        {errors.titulo && <span className="error-msg">{errors.titulo.message}</span>}
      </div>

      {/* Campo Cuerpo */}
      <div className="form-group">
        <label>Cuerpo:</label>
        <textarea 
          rows="5"
          {...register("cuerpo", { 
            required: "El cuerpo es requerido" 
          })} 
        ></textarea>
        {errors.cuerpo && <span className="error-msg">{errors.cuerpo.message}</span>}
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-guardar" disabled={estaCargando}>
          {estaCargando ? "Publicando..." : "Publicar"}
        </button>
        <button type="button" className="btn-cancelar" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
export default PublicacionForm;