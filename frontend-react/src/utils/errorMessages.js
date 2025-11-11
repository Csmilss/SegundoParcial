// Utilidad para obtener mensajes de error temáticos según el código HTTP
export const getErrorMessage = (error) => {
  const statusCode = error.response?.status;
  const serverMessage = error.response?.data?.mensaje || error.message;

  switch (statusCode) {
    case 400:
      return {
        title: '⚠️ Petición Rechazada',
        message: 'El Santuario rechaza tu solicitud',
        detail: serverMessage || 'Los datos enviados no son válidos o están incompletos',
        hint: '🗡️ Verifica que todos los campos estén completos y sean correctos'
      };
    
    case 404:
      return {
        title: '💀 Alma No Encontrada',
        message: 'El guerrero o recurso que buscas no existe en este reino',
        detail: serverMessage || 'Recurso no encontrado',
        hint: '🔍 Verifica que el ID sea correcto o que el recurso no haya sido eliminado'
      };
    
    case 409:
      return {
        title: '⚔️ Conflicto de Almas',
        message: 'Ya existe un guerrero con esos datos',
        detail: serverMessage || 'El recurso que intentas crear ya existe',
        hint: '📧 Puede que el correo electrónico ya esté registrado en Soul Society'
      };
    
    case 500:
      return {
        title: '🔥 La Hoguera se ha Apagado',
        message: 'Error Interno del Servidor (500)',
        detail: serverMessage || 'El Santuario de las Almas ha dejado de responder',
        hint: '💀 Verifica que el servidor backend esté activo en el puerto 4000 o revisa los logs del servidor'
      };
    
    default:
      // Error de conexión (sin respuesta del servidor)
      if (!error.response) {
        return {
          title: '🔥 La Hoguera se ha Apagado',
          message: 'No se puede establecer conexión con el servidor',
          detail: 'Error de red - El servidor no responde',
          hint: '💀 Asegúrate de que el servidor backend esté ejecutándose en el puerto 4000'
        };
      }
      
      return {
        title: '❌ Error Desconocido',
        message: 'Algo salió mal en tu viaje',
        detail: serverMessage || 'Error desconocido',
        hint: '🗡️ Intenta nuevamente o contacta con los ancianos del Santuario'
      };
  }
};
