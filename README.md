# 🎮 Soul Society - Red Social Gamer

**Desarrollo de Software - Parcial 2 - 89925 Riccio**

Red social temática Dark Souls con backend Express/Sequelize y frontend React.

---

## 🚀 Instalación y Ejecución

### Requisitos Previos
- **Node.js** versión 18 o superior
- **npm** (viene con Node.js)

### 1️⃣ Backend (Node.js + Express + Sequelize)

#### Instalación de dependencias:
```bash
cd backend
npm install
```

**Dependencias que se instalarán:**
- `express` (v5.1.0) - Framework web
- `sequelize` (v6.37.7) - ORM para base de datos
- `sqlite3` (v5.1.7) - Driver SQLite
- `cors` (v2.8.5) - Middleware CORS para desarrollo

#### Ejecutar el servidor:
```bash
npm start
```

#### Scripts disponibles:
- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia con hot-reload (Node.js --watch)
- `npm run seed` - Ejecuta el seeder para datos de prueba

**Servidor corriendo en:** `http://localhost:4000`

**Base de datos:** SQLite (`datos/RedSocialGamer.sqlite`) - se crea automáticamente al iniciar

---

### 2️⃣ Frontend (React + Vite)

#### Instalación de dependencias:
```bash
cd frontend-react
npm install
```

**Dependencias principales que se instalarán:**
- `react` (v19.1.1) - Biblioteca UI
- `react-dom` (v19.1.1) - Renderizado React
- `react-router-dom` (v7.9.5) - Navegación SPA
- `react-hook-form` (v7.66.0) - Manejo de formularios
- `axios` (v1.13.2) - Cliente HTTP

**DevDependencies:**
- `vite` (v7.1.7) - Build tool y dev server
- `@vitejs/plugin-react` (v5.0.4) - Plugin React para Vite
- `eslint` (v9.36.0) + plugins - Linter de código

#### Ejecutar el servidor de desarrollo:
```bash
npm run dev
```

#### Scripts disponibles:
- `npm run dev` - Inicia servidor de desarrollo con hot-reload
- `npm run build` - Genera build de producción
- `npm run preview` - Preview del build de producción
- `npm run lint` - Ejecuta linter ESLint

**Aplicación corriendo en:** `http://localhost:5173`

---

### 3️⃣ Ejecutar ambos proyectos simultáneamente

**Opción 1 - Dos terminales:**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend-react
npm run dev
```

**Opción 2 - Con tmux/screen (opcional):**
```bash
# Crear sesión dividida
tmux new-session \; split-window -h \; select-pane -t 0 \; send-keys 'cd backend && npm start' C-m \; select-pane -t 1 \; send-keys 'cd frontend-react && npm run dev' C-m
```

---

### ⚙️ Configuración Inicial (Primera vez)

1. **Clonar/descargar el proyecto**
2. **Instalar backend:**
   ```bash
   cd backend
   npm install
   npm run seed  # (Opcional) Cargar datos de prueba
   npm start
   ```
3. **Instalar frontend:**
   ```bash
   cd frontend-react
   npm install
   npm run dev
   ```
4. **Abrir en el navegador:** `http://localhost:5173`

---

## 🧪 Colección de Pruebas API

📄 **Archivo:** `backend/api-tests.http`

Este archivo contiene **32 tests** completos de todos los endpoints, incluyendo casos exitosos y de error.

**Cómo usar:**

**Opción 1 - VS Code (Recomendado):**
1. Instalar extensión **REST Client** (humao.rest-client)
2. Abrir `backend/api-tests.http`
3. Hacer clic en "Send Request" sobre cada test

**Opción 2 - IntelliJ IDEA / WebStorm:**
- Soporte nativo para archivos `.http`
- Abrir el archivo y ejecutar con el botón verde ▶️

**Opción 3 - Postman:**
1. Importar el archivo `.http`
2. Postman lo convertirá a una colección automáticamente

**Opción 4 - Insomnia:**
1. File → Import → Seleccionar `api-tests.http`

**Tests incluidos:**
- ✅ CRUD completo de Usuarios (9 tests)
- ✅ CRUD completo de Publicaciones (10 tests)  
- ✅ CRUD completo de Comentarios (8 tests)
- ✅ Tests específicos de errores 400, 404, 409, 500 (5 tests)

---

## 📚 Diccionario de Endpoints

### **USUARIOS**

#### `GET /api/usuarios`
**Descripción:** Obtiene todos los usuarios registrados

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "nombre": "Ashen One",
    "correo": "ashen@darksouls.com",
    "ciudad": "Firelink Shrine",
    "createdAt": "2025-11-04T10:30:00.000Z",
    "updatedAt": "2025-11-04T10:30:00.000Z"
  }
]
```

---

#### `GET /api/usuarios/:id`
**Descripción:** Obtiene un usuario específico por ID

**Ejemplo:** `GET /api/usuarios/1`

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "nombre": "Ashen One",
  "correo": "ashen@darksouls.com",
  "ciudad": "Firelink Shrine",
  "createdAt": "2025-11-04T10:30:00.000Z",
  "updatedAt": "2025-11-04T10:30:00.000Z"
}
```

**Error (404):**
```json
{
  "error": "Usuario no encontrado"
}
```

---

#### `POST /api/usuarios`
**Descripción:** Crea un nuevo usuario

**Body requerido:**
```json
{
  "nombre": "Solaire of Astora",
  "correo": "solaire@darksouls.com",
  "ciudad": "Anor Londo"
}
```

**Respuesta exitosa (201):**
```json
{
  "id": 2,
  "nombre": "Solaire of Astora",
  "correo": "solaire@darksouls.com",
  "ciudad": "Anor Londo",
  "createdAt": "2025-11-04T11:00:00.000Z",
  "updatedAt": "2025-11-04T11:00:00.000Z"
}
```

**Errores posibles:**
- **400 Bad Request:** Campos obligatorios faltantes
- **409 Conflict:** Email ya registrado

---

#### `PUT /api/usuarios/:id`
**Descripción:** Actualiza un usuario existente

**Ejemplo:** `PUT /api/usuarios/1`

**Body (campos opcionales):**
```json
{
  "nombre": "Ashen One Updated",
  "ciudad": "Lothric Castle"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "nombre": "Ashen One Updated",
  "correo": "ashen@darksouls.com",
  "ciudad": "Lothric Castle",
  "createdAt": "2025-11-04T10:30:00.000Z",
  "updatedAt": "2025-11-04T11:15:00.000Z"
}
```

**Error (404):**
```json
{
  "error": "Usuario no encontrado"
}
```

---

#### `DELETE /api/usuarios/:id`
**Descripción:** Elimina un usuario (y todas sus publicaciones en cascada)

**Ejemplo:** `DELETE /api/usuarios/1`

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Usuario eliminado exitosamente"
}
```

**Error (404):**
```json
{
  "error": "Usuario no encontrado"
}
```

---

### **PUBLICACIONES**

#### `GET /api/usuarios/:usuarioId/publicaciones`
**Descripción:** Obtiene todas las publicaciones de un usuario específico

**Ejemplo:** `GET /api/usuarios/1/publicaciones`

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "titulo": "Mi primera victoria contra un boss",
    "cuerpo": "Finalmente derroté a Ornstein y Smough después de 50 intentos",
    "usuarioId": 1,
    "createdAt": "2025-11-04T10:45:00.000Z",
    "updatedAt": "2025-11-04T10:45:00.000Z"
  }
]
```

**Error (404):**
```json
{
  "error": "Usuario no encontrado"
}
```

---

#### `GET /api/publicaciones/:id`
**Descripción:** Obtiene una publicación específica por ID

**Ejemplo:** `GET /api/publicaciones/1`

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "titulo": "Mi primera victoria contra un boss",
  "cuerpo": "Finalmente derroté a Ornstein y Smough después de 50 intentos",
  "usuarioId": 1,
  "createdAt": "2025-11-04T10:45:00.000Z",
  "updatedAt": "2025-11-04T10:45:00.000Z"
}
```

**Error (404):**
```json
{
  "error": "Publicación no encontrada"
}
```

---

#### `POST /api/usuarios/:usuarioId/publicaciones`
**Descripción:** Crea una nueva publicación para un usuario

**Ejemplo:** `POST /api/usuarios/1/publicaciones`

**Body requerido:**
```json
{
  "titulo": "Tips para derrotar a Nameless King",
  "cuerpo": "La clave está en la paciencia y timing perfecto..."
}
```

**Respuesta exitosa (201):**
```json
{
  "id": 2,
  "titulo": "Tips para derrotar a Nameless King",
  "cuerpo": "La clave está en la paciencia y timing perfecto...",
  "usuarioId": 1,
  "createdAt": "2025-11-04T12:00:00.000Z",
  "updatedAt": "2025-11-04T12:00:00.000Z"
}
```

**Errores posibles:**
- **400 Bad Request:** Título o cuerpo faltantes
- **404 Not Found:** Usuario no existe

---

#### `PUT /api/publicaciones/:id`
**Descripción:** Actualiza una publicación existente

**Ejemplo:** `PUT /api/publicaciones/1`

**Body (campos opcionales):**
```json
{
  "titulo": "Mi primera victoria contra un boss [ACTUALIZADO]",
  "cuerpo": "Contenido actualizado..."
}
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "titulo": "Mi primera victoria contra un boss [ACTUALIZADO]",
  "cuerpo": "Contenido actualizado...",
  "usuarioId": 1,
  "createdAt": "2025-11-04T10:45:00.000Z",
  "updatedAt": "2025-11-04T12:30:00.000Z"
}
```

**Error (404):**
```json
{
  "error": "Publicación no encontrada"
}
```

---

#### `DELETE /api/publicaciones/:id`
**Descripción:** Elimina una publicación (y todos sus comentarios en cascada)

**Ejemplo:** `DELETE /api/publicaciones/1`

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Publicación eliminada exitosamente"
}
```

**Error (404):**
```json
{
  "error": "Publicación no encontrada"
}
```

---

### **COMENTARIOS**

#### `GET /api/publicaciones/:publicacionId/comentarios`
**Descripción:** Obtiene todos los comentarios de una publicación

**Ejemplo:** `GET /api/publicaciones/1/comentarios`

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "nombre": "Siegmeyer",
    "correo": "siegmeyer@catarina.com",
    "cuerpo": "¡Excelente estrategia! Me sirvió mucho.",
    "publicacionId": 1,
    "createdAt": "2025-11-04T11:00:00.000Z",
    "updatedAt": "2025-11-04T11:00:00.000Z"
  }
]
```

**Error (404):**
```json
{
  "error": "Publicación no encontrada"
}
```

---

#### `POST /api/publicaciones/:publicacionId/comentarios`
**Descripción:** Crea un comentario en una publicación (comentarios de invitados, sin registro)

**Ejemplo:** `POST /api/publicaciones/1/comentarios`

**Body requerido:**
```json
{
  "nombre": "Patches",
  "correo": "patches@unbreakable.com",
  "cuerpo": "Hmm... interesante técnica"
}
```

**Respuesta exitosa (201):**
```json
{
  "id": 2,
  "nombre": "Patches",
  "correo": "patches@unbreakable.com",
  "cuerpo": "Hmm... interesante técnica",
  "publicacionId": 1,
  "createdAt": "2025-11-04T13:00:00.000Z",
  "updatedAt": "2025-11-04T13:00:00.000Z"
}
```

**Errores posibles:**
- **400 Bad Request:** Campos obligatorios faltantes o email inválido
- **404 Not Found:** Publicación no existe

---

#### `DELETE /api/comentarios/:id`
**Descripción:** Elimina un comentario específico

**Ejemplo:** `DELETE /api/comentarios/1`

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Comentario eliminado exitosamente"
}
```

**Error (404):**
```json
{
  "error": "Comentario no encontrado"
}
```

---

## 🎯 Decisiones y Supuestos

### Arquitectura
- **Backend:** Express.js con arquitectura MVC (models, routes, middlewares)
- **ORM:** Sequelize con SQLite para simplicidad y portabilidad
- **Frontend:** React 18 con Vite (desarrollo rápido y moderno)
- **Routing:** React Router DOM para navegación SPA

### Modelos y Relaciones
- **Usuario → Publicaciones:** Relación 1:N con eliminación en cascada
- **Publicación → Comentarios:** Relación 1:N con eliminación en cascada
- **Comentarios:** Sistema de invitados (sin relación con Usuario) para simplicidad

### Manejo de Errores
- **Códigos HTTP estandarizados:** 200, 201, 400, 404, 409, 500
- **Middleware centralizado:** `errorHandler.js` para respuestas consistentes
- **Frontend:** Utility `errorMessages.js` para mensajes temáticos Dark Souls

### Validaciones
- **Backend:** Validaciones obligatorias en todos los endpoints
- **Frontend:** React Hook Form con validaciones opcionales (pueden deshabilitarse para testing)
- **Email:** Único por usuario (validación 409 Conflict)

### UI/UX
- **Tema Dark Souls "Soul Society":** Paleta dorada/ember con fondo oscuro
- **Formularios colapsables:** Reducir clutter visual
- **Lazy loading:** Comentarios se cargan solo al expandir publicación
- **Contador inteligente:** Muestra cantidad de comentarios sin cargarlos todos

### Supuestos Técnicos
- **Puerto Backend:** 4000 (configurable en `backend/src/app.js`)
- **Puerto Frontend:** 5173 (default de Vite)
- **CORS:** Habilitado para desarrollo local
- **Seed:** Datos de prueba incluidos en `backend/src/seed.js`
- **Base de datos:** Se crea automáticamente al iniciar el backend

### Características Extras (Bonus Points)
- ✅ **React Hook Form:** Implementado en todos los formularios
- ✅ **Sistema de Comentarios:** CRUD completo con UI integrada
- ✅ **Manejo de errores HTTP:** 400, 404, 409, 500 con mensajes temáticos
- ✅ **Validación de email único:** Evita usuarios duplicados

---

## 📂 Estructura del Proyecto

```
89925-riccio/
├── backend/
│   ├── src/
│   │   ├── models/          # Usuario, Publicacion, Comentario
│   │   ├── routes/          # Endpoints REST
│   │   ├── middlewares/     # errorHandler, notFound
│   │   ├── app.js           # Configuración Express
│   │   ├── db.js            # Conexión Sequelize
│   │   └── seed.js          # Datos de prueba
│   ├── datos/               # SQLite database
│   └── package.json
│
├── frontend-react/
│   ├── src/
│   │   ├── components/      # Cards, Formularios, Navbar
│   │   ├── pages/           # Inicio, Usuarios, Publicaciones
│   │   ├── utils/           # errorMessages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md (este archivo)
```

---

## 🧪 Testing de Errores HTTP

Ver archivo `RESUMEN_ERRORES.md` para guía detallada de cómo probar cada código de error.

**Resumen rápido:**
- **400:** Enviar campos vacíos o email inválido en comentarios
- **404:** Acceder a `/usuarios/999/publicaciones`
- **409:** Crear usuario con email duplicado
- **500:** Detener el backend e intentar hacer requests

---

## 👤 Autor

**Legajo:** 89925  
**Apellido:** Riccio  
**Materia:** Desarrollo de Software - 3K1A  
**Instancia:** Parcial 2
