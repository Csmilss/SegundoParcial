import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Importamos la conexión (con .js)

const Publicacion = sequelize.define(
  'Publicacion',
  {
    // Atributos 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El título no puede estar vacío" },
      }
    },
    cuerpo: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El cuerpo no puede estar vacío" },
      }
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    // Opciones 
    timestamps: false,
    tableName: 'Publicaciones',
    hooks: {
      beforeValidate: (publicacion) => {
        if (typeof publicacion.titulo === "string") {
          publicacion.titulo = publicacion.titulo.trim();
        }
        if (typeof publicacion.cuerpo === "string") {
          publicacion.cuerpo = publicacion.cuerpo.trim();
        }
      },
    }
  }
);

export default Publicacion;