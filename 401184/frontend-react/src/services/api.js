import axios from 'axios';

// 1. Creamos la instancia de Axios (como antes)
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api'
});

// 2. Función para manejar y normalizar errores
const manejarError = (error) => {
  console.error("Error en la API:", error);

  // Error del Backend (ej: 404, 409, 500)
  // El backend nos da una respuesta con { error: true, mensaje: "..." }
  if (error.response && error.response.data && error.response.data.mensaje) {
    return { error: true, mensaje: error.response.data.mensaje };
  }

  // Error de red (ej: backend caído) o error de Axios
  if (error.message) {
    return { error: true, mensaje: error.message };
  }

  // Otro error inesperado
  return { error: true, mensaje: 'Ocurrió un error inesperado.' };
};

// Helper para GET
export const get = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data; // Devuelve solo los datos
  } catch (error) {
    return manejarError(error); // Devuelve el error normalizado
  }
};

// Helper para POST
export const post = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data; // Devuelve los datos creados
  } catch (error) {
    return manejarError(error); // Devuelve el error normalizado
  }
};

// Helper para DELETE
export const del = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data; // Devuelve el mensaje de éxito
  } catch (error) {
    return manejarError(error); // Devuelve el error normalizado
  }
};
