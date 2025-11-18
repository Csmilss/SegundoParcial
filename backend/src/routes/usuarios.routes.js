import { Router } from 'express';
import { Usuario } from '../models/Usuario.js';
import { Publicacion } from '../models/Publicacion.js';
import { badRequest, notFound, conflict } from '../middlewares/errorHandler.js';

const router = Router();

// GET /api/usuarios - Lista usuarios con filtros y paginación
router.get('/', async (req, res, next) => {
    try {
        const { q, pagina = 1, limite = 10 } = req.query;
        
        const offset = (pagina - 1) * limite;
        const where = {};
        
        // Filtro por query (busca en nombre, correo o ciudad)
        if (q) {
            const { Op } = await import('sequelize');
            where[Op.or] = [
                { nombre: { [Op.like]: `%${q}%` } },
                { correo: { [Op.like]: `%${q}%` } },
                { ciudad: { [Op.like]: `%${q}%` } }
            ];
        }
        
        const usuarios = await Usuario.findAll({
            where,
            limit: parseInt(limite),
            offset: parseInt(offset),
            order: [['id', 'ASC']] // Orden por defecto: id ascendente
        });
        
        res.json(usuarios);
    } catch (error) {
        next(error);
    }
});

// GET /api/usuarios/:id - Detalle de usuario
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const usuario = await Usuario.findByPk(id);
        
        if (!usuario) {
            throw notFound('Usuario no encontrado');
        }
        
        res.json(usuario);
    } catch (error) {
        next(error);
    }
});

// POST /api/usuarios - Crear usuario
router.post('/', async (req, res, next) => {
    try {
        const { nombre, correo, ciudad } = req.body;
        
        // Validar datos requeridos
        if (!nombre?.trim() || !correo?.trim() || !ciudad?.trim()) {
            throw badRequest('Nombre, correo y ciudad son obligatorios');
        }
        
        // Verificar si el correo ya existe
        const usuarioExistente = await Usuario.findOne({ where: { correo: correo.trim() } });
        if (usuarioExistente) {
            throw conflict('Ya existe un guerrero con ese correo electrónico en Soul Society');
        }
        
        const usuario = await Usuario.create({
            nombre: nombre.trim(),
            correo: correo.trim(),
            ciudad: ciudad.trim()
        });
        
        res.status(201).json(usuario);
    } catch (error) {
        next(error);
    }
});

// PUT /api/usuarios/:id - Actualizar usuario (parcial)
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, correo, ciudad } = req.body;
        
        const usuario = await Usuario.findByPk(id);
        
        if (!usuario) {
            throw notFound('Usuario no encontrado');
        }
        
        // Validar que los strings no estén vacíos si se envían
        if (nombre !== undefined && !nombre?.trim()) {
            throw badRequest('El nombre no puede estar vacío');
        }
        if (correo !== undefined && !correo?.trim()) {
            throw badRequest('El correo no puede estar vacío');
        }
        if (ciudad !== undefined && !ciudad?.trim()) {
            throw badRequest('La ciudad no puede estar vacía');
        }
        
        // Si se actualiza el correo, verificar que no exista
        if (correo && correo !== usuario.correo) {
            const correoExistente = await Usuario.findOne({ where: { correo } });
            if (correoExistente) {
                throw conflict('El correo ya está registrado');
            }
        }
        
        // Actualizar solo los campos enviados
        if (nombre) usuario.nombre = nombre.trim();
        if (correo) usuario.correo = correo.trim();
        if (ciudad) usuario.ciudad = ciudad.trim();
        
        await usuario.save();
        
        res.json(usuario);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/usuarios/:id - Eliminar usuario
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const usuario = await Usuario.findByPk(id);
        
        if (!usuario) {
            throw notFound('Usuario no encontrado');
        }
        
        await usuario.destroy();
        
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

// GET /api/usuarios/:id/publicaciones - Publicaciones del usuario
router.get('/:id/publicaciones', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { pagina = 1, limite = 10 } = req.query;
        
        const usuario = await Usuario.findByPk(id);
        
        if (!usuario) {
            throw notFound('Usuario no encontrado');
        }
        
        const offset = (pagina - 1) * limite;
        
        const publicaciones = await Publicacion.findAll({
            where: { usuarioId: id },
            limit: parseInt(limite),
            offset: parseInt(offset),
            order: [['id', 'ASC']]
        });
        
        res.json(publicaciones);
    } catch (error) {
        next(error);
    }
});

export default router;