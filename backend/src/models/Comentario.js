import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Comentario = sequelize.define('Comentario', {
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
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    cuerpo: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    publicacionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'publicaciones',
            key: 'id'
        }
    }
}, {
    tableName: 'comentarios',
    timestamps: true
});

// Relaciones
Comentario.associate = (models) => {
    Comentario.belongsTo(models.Publicacion, {
        foreignKey: 'publicacionId',
        as: 'publicacion'
    });
};