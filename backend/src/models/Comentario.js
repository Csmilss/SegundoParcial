import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Importamos la conexión (con .js)

const Comentario = sequelize.define(
  'Comentario',
  {
    // Atributos
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre no puede estar vacío" },
      }
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "El formato del correo no es válido" },
        notEmpty: { msg: "El correo no puede estar vacío" },
      }
    },
    cuerpo: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El cuerpo no puede estar vacío" },
      }
    },
    publicacionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    // --- Opciones ---
    timestamps: false,
    tableName: 'Comentarios',
    hooks: {
      beforeValidate: (comentario) => {
        if (typeof comentario.nombre === "string") {
          comentario.nombre = comentario.nombre.trim();
        }
        if (typeof comentario.cuerpo === "string") {
          comentario.cuerpo = comentario.cuerpo.trim();
        }
        if (typeof comentario.correo === "string") {
          comentario.correo = comentario.correo.trim();
        }
      },
    }
  }
);

export default Comentario;