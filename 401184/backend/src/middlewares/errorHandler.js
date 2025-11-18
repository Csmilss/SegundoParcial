// Middleware para manejar errores de forma centralizada
function errorHandler(err, req, res, next) {
  // 1. Log del error (¡importante para debug!)
  console.error("ERROR DETECTADO:", err.message);

  // 2. Errores de Sequelize (Validación, Único)
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    // 409 Conflict: El recurso ya existe (correo duplicado) o la data es inválida
    const mensajes = err.errors.map(e => e.message).join(', ');
    return res.status(409).json({
      error: true,
      mensaje: mensajes
    });
  }

  // 3. Error personalizado (si lo lanzamos manualmente con un status)
  if (err.status) {
    return res.status(err.status).json({
      error: true,
      mensaje: err.message
    });
  }

  // 4. Error 500 (Interno del Servidor) - El "catch-all"
  // Si el error no es de un tipo conocido, es un 500.
  return res.status(500).json({
    error: true,
    mensaje: "Error interno del servidor. Intente más tarde."
  });
}

export default errorHandler;