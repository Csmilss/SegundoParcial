import { Sequelize } from 'sequelize';

// Configuración de la Conexión a la BD (SQLite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Ruta al archivo de la base de datos
  logging: false,
});

// Exportamos la instancia de Sequelize para usarla en otras partes de la aplicación
export default sequelize;