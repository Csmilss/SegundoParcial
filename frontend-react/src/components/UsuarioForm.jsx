import { useForm } from 'react-hook-form';
import '../styles/UsuarioForm.css'; 

// 1. Recibimos dos funciones "props" del padre:
// onSave: qué hacer cuando el form es válido
// onCancel: qué hacer cuando se aprieta "Cancelar"
function UsuarioForm({ onSave, onCancel }) {

  // 2. Inicializamos react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // 3. Esta función solo se llama si el form es válido
  const onSubmit = (data) => {
    onSave(data); // Llamamos a la función del padre
  };

  return (
    <form className="usuario-form" onSubmit={handleSubmit(onSubmit)}>
      <h4>Crear Nuevo Usuario</h4>
      
      {/* Campo Nombre */}
      <div className="form-group">
        <label>Nombre:</label>
        <input 
          type="text"
          {...register("nombre", { 
            required: "El nombre es requerido" 
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
            pattern: {
              value: /^\S+@\S+$/i, // Validación de email
              message: "El formato del correo no es válido"
            }
          })} 
        />
        {errors.correo && <span className="error-msg">{errors.correo.message}</span>}
      </div>

      {/* Campo Ciudad */}
      <div className="form-group">
        <label>Ciudad:</label>
        <input 
          type="text"
          {...register("ciudad", { 
            required: "La ciudad es requerida" 
          })} 
        />
        {errors.ciudad && <span className="error-msg">{errors.ciudad.message}</span>}
      </div>

      {/* Botones */}
      <div className="form-buttons">
        <button type="submit" className="btn-guardar">Guardar</button>
        <button type="button" className="btn-cancelar" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default UsuarioForm;