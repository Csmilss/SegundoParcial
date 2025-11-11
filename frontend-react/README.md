# Soul Society - Red Social Gamer 🎮🔥

Frontend React con tema Dark Souls para la red social gamer.

---

## 🚀 Inicio Rápido

### Instalar dependencias
```bash
npm install
```

### Levantar el servidor de desarrollo
```bash
npm run dev
```

---

## 🧪 Cómo Probar los Códigos de Error HTTP

El sistema implementa mensajes de error temáticos para códigos **400**, **404**, **409** y **500**.

### ⚠️ **Error 400 - Bad Request**
**Cómo probarlo:**
1. Ve a la página **Publicaciones** (`/publicaciones`)
2. Expande cualquier publicación (clic en el título)
3. Expande el formulario de comentarios (▼)
4. **Deja campos vacíos** o **ingresa un email inválido** (ej: `test` sin @)
5. Envía el formulario → Verás el error 400

### 💀 **Error 404 - Not Found**
**Cómo probarlo:**
1. Ve a **Usuarios** (`/usuarios`)
2. Navega a publicaciones de un usuario (clic en "Ver publicaciones")
3. En la URL, **cambia el ID a uno inexistente** (ej: `/usuarios/999/publicaciones`)
4. Presiona Enter → Verás el error 404

### ⚔️ **Error 409 - Conflict**
**Cómo probarlo:**
1. Ve a **Usuarios** (`/usuarios`)
2. Expande el formulario (▼)
3. Crea un usuario con email `test@example.com`
4. **Intenta crear otro usuario con el mismo email**
5. Envía el formulario → Verás el error 409

### 🔥 **Error 500 - Server Error**
**Cómo probarlo:**
1. **Detén el servidor backend** (Ctrl+C en la terminal del backend)
2. Intenta cargar cualquier página (Usuarios, Publicaciones)
3. O intenta crear un recurso → Verás el error 500

---

## 📦 Tecnologías Utilizadas

- **React 18** con Vite
- **React Router DOM** - Navegación
- **React Hook Form** - Formularios validados
- **Axios** - Cliente HTTP
- **CSS Modules** - Estilos temáticos Dark Souls

---

## 🎨 Características

- ✅ Formularios colapsables para crear Usuarios, Publicaciones y Comentarios
- ✅ Validación con React Hook Form
- ✅ Manejo de errores HTTP con mensajes temáticos
- ✅ Tema Dark Souls "Soul Society"
- ✅ Cards expandibles con lazy loading de comentarios
- ✅ Sistema de comentarios de invitados (sin registro)

---

## 📁 Estructura del Proyecto

```
src/
├── components/      # Formularios, Cards, Navbar, Loading
├── pages/          # Inicio, Usuarios, Publicaciones, Crear, Error404
├── utils/          # errorMessages.js (manejo centralizado de errores)
├── App.jsx         # Rutas principales
└── main.jsx        # Entry point
```
