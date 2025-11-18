# 🎯 Errores HTTP en Soul Society

## Lo que se implementó:

### 1. **Utilidad centralizada** (`errorMessages.js`)
   - Función `getErrorMessage()` que mapea códigos HTTP a mensajes temáticos
   - Todos los errores tienen título, mensaje, detalle y hint personalizados

### 2. **Mensajes Temáticos Dark Souls**

```
400 → ⚠️  "Petición Rechazada" 
404 → 💀 "Alma No Encontrada"
409 → ⚔️  "Conflicto de Almas"
500 → 🔥 "La Hoguera se ha Apagado"
```

### 3. **Componentes actualizados**
   - `Usuarios.jsx` - usa `getErrorMessage()`
   - `Publicaciones.jsx` - usa `getErrorMessage()`
   - Ambos muestran dinámicamente el error correcto según el código HTTP

---

## 🧪 CÓMO PROBAR CADA ERROR:

### **400 - Bad Request**
```bash
# En el formulario de crear guerrero:
1. Expandir "Agregar comentario"
2. Ingresar Mail no valido
3. Click en "Comentar"
✅ Verás: "⚠️ Petición Rechazada"
```

### **404 - Not Found**
```bash
# En el navegador, ir a:
http://localhost:5173/usuarios/999/publicaciones

# O probar con un ID que no existe en tu BD
✅ Verás: "💀 Alma No Encontrada"
```

### **409 - Conflict**
```bash
# Crear usuario duplicado:
1. Crear un usuario con correo: test@example.com
2. Intentar crear OTRO usuario con el MISMO correo
✅ Verás: "⚔️ Conflicto de Almas - Ya existe un guerrero con ese correo"
```

### **500 - Internal Server Error**
```bash
# Detener el backend:
1. En la terminal del backend, presionar Ctrl+C
2. En el navegador, ir a /usuarios
✅ Verás: "🔥 La Hoguera se ha Apagado"
```


