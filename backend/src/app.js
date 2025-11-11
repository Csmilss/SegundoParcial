import express from 'express';
import cors from 'cors';
import { sequelize } from './db.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import { Usuario } from './models/Usuario.js';
import { Publicacion } from './models/Publicacion.js';
import { Comentario } from './models/Comentario.js';

// Importar routes
import usuariosRoutes from './routes/usuarios.routes.js';
import publicacionesRoutes from './routes/publicaciones.routes.js';
import comentariosRoutes from './routes/comentarios.routes.js';

// Inicializar relaciones
const models = { Usuario, Publicacion, Comentario };
Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

const app = express();

app.use(cors());
app.use(express.json());

// Sincronizar base de datos
sequelize.sync();

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/comentarios', comentariosRoutes);

// Middlewares de manejo de errores
app.use(notFound);
app.use(errorHandler);


app.listen(4000, () => { 
  console.log('Server is running on port 4000');
});
