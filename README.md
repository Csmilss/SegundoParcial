# Parcial 2 - Mini-Red Social (DDS 2025)

Este proyecto es una aplicación Full Stack (React + Node.js) que implementa una API RESTful para una mini-red social y un frontend para consumirla.

**Alumno:**
* Gomez, Nahuel Baltazar

**Legajo:**
* 401184



# 1. Cómo Instalar y Correr el Proyecto

El proyecto se divide en dos carpetas: `backend` y `frontend-react`. Ambos servidores deben estar corriendo en paralelo.

# Backend (API)

1.  Navegar a la carpeta del backend:
    
    cd backend

2.  Instalar las dependencias (solo la primera vez):

    npm install

3.  Iniciar el servidor en modo de desarrollo (con nodemon):

    npm run dev

4.  El servidor se ejecutará en `http://localhost:4000`.

# Frontend (React)

1.  Abrir una **nueva terminal**.
2.  Navegar a la carpeta del frontend:

    cd frontend-react

3.  Instalar las dependencias (solo la primera vez):

    npm install

4.  Iniciar el servidor de desarrollo de Vite:

    npm run dev

5.  El proyecto se abrirá automáticamente en `http://localhost:3000` (o el puerto que tengas configurado).



# 2. Diccionario de Endpoints (API)

La URL base de la API es: `http://localhost:4000/api`

# Usuarios (`/api/usuarios`)

| Método | Ruta | Descripción | Ejemplo (Body) |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Lista usuarios (con filtro `q` y paginación) | `N/A` |
| `GET` | `/:id` | Obtiene un solo usuario por su ID. | `N/A` |
| `POST` | `/` | Crea un nuevo usuario. | `{ "nombre": "Juan", "correo": "j@e.com", "ciudad": "CBA" }` |
| `PUT` | `/:id` | Actualiza un usuario (parcial). | `{ "ciudad": "Rosario" }` |
| `DELETE` | `/:id` | Elimina un usuario. | `N/A` |
| `GET` | `/:id/publicaciones` | Lista todas las publicaciones de un usuario. | `N/A` |

# Publicaciones (`/api/publicaciones`)

| Método | Ruta | Descripción | Ejemplo (Body) |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Lista publicaciones (con filtro `q` y `usuarioId`). | `N/A` |
| `GET` | `/:id` | Obtiene una sola publicación. | `N/A` |
| `POST` | `/` | Crea una nueva publicación. | `{ "usuarioId": 1, "titulo": "Hola", "cuerpo": "..." }` |
| `PUT` | `/:id` | Actualiza una publicación (título y cuerpo). | `{ "titulo": "Título Editado" }` |
| `DELETE` | `/:id` | Elimina una publicación. | `N/A` |
| `GET` | `/:id/comentarios` | Lista los comentarios de una publicación. | `N/A` |
| `POST` | `/:id/comentarios` | Crea un comentario para una publicación. | `{ "nombre": "Lector", "correo": "l@e.com", "cuerpo": "..." }` |

# Comentarios (`/api/comentarios`)

| Método | Ruta | Descripción | Ejemplo (Body) |
| :--- | :--- | :--- | :--- |
| `DELETE` | `/:id` | Elimina un comentario por su ID. | `N/A` |