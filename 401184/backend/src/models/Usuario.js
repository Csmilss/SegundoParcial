import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Importamos la conexión (con .js)

// Definimos el modelo "Usuario"
const Usuario = sequelize.define(
  'Usuario',
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
      unique: {
        args: true,
        msg: "El correo ya está registrado"
      },
      validate: {
        isEmail: { msg: "El formato del correo no es válido" },
        notEmpty: { msg: "El correo no puede estar vacío" },
      }
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La ciudad no puede estar vacía" },
      }
    }
  },
  {
    // Opciones 
    timestamps: false,
    tableName: 'Usuarios',
    hooks: {
      beforeValidate: (usuario) => {
        if (typeof usuario.nombre === "string") {
          usuario.nombre = usuario.nombre.trim();
        }
        if (typeof usuario.correo === "string") {
          usuario.correo = usuario.correo.trim();
        }
        if (typeof usuario.ciudad === "string") {
          usuario.ciudad = usuario.ciudad.trim();
        }
      },
    }
  }
);

// Exportamos EL MODELO
export default Usuario;