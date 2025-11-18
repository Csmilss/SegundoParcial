import axios from 'axios';

// 1. Creamos una instancia de axios con la URL base de tu backend
// Tal como lo pide el enunciado del parcial
const api = axios.create({
  baseURL: 'http://localhost:4000/api'
});

// 2. Exportamos la instancia para que otros componentes la usen
export default api;