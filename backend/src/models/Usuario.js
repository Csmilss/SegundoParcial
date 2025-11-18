import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    tableName: 'usuarios',
    timestamps: true
});

// Relaciones
Usuario.associate = (models) => {
    Usuario.hasMany(models.Publicacion, {
        foreignKey: 'usuarioId',
        as: 'publicaciones'
    });
};

