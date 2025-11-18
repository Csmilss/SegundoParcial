import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
// importar modelos
import Usuario from './models/Usuario.js';
import Publicacion from './models/Publicacion.js';
import Comentario from './models/Comentario.js';
// importar rutas
import usuariosRoutes from './routes/usuarios.routes.js';
import publicacionesRoutes from './routes/publicaciones.routes.js';
import comentariosRoutes from './routes/comentarios.routes.js';
// importar middlewares de error
import errorHandler from './middlewares/errorHandler.js';

// asociaciones entre modelos
Usuario.hasMany(Publicacion, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
Publicacion.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Publicacion.hasMany(Comentario, { foreignKey: 'publicacionId', onDelete: 'CASCADE' });
Comentario.belongsTo(Publicacion, { foreignKey: 'publicacionId' });

// configuración del servidor express
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// usar las rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/comentarios', comentariosRoutes);

// middlewares de manejo de errores y rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: true,
    mensaje: `Ruta '${req.originalUrl}' no encontrada.`
  });
});

app.use(errorHandler); 

// arranque y sincronización de la base de datos
app.listen(PORT, async () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  try {
    await sequelize.sync({ force: false });
    console.log('Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
});