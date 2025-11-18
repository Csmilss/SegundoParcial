import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Publicacion = sequelize.define('Publicacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
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
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    }
}, {
    tableName: 'publicaciones',
    timestamps: true
});

// Relaciones
Publicacion.associate = (models) => {
    Publicacion.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario'
    });
    Publicacion.hasMany(models.Comentario, {
        foreignKey: 'publicacionId',
        as: 'comentarios'
    });
};
