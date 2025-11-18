

import { Router } from 'express';
import { Publicacion } from '../models/Publicacion.js';
import { Usuario } from '../models/Usuario.js';
import { Comentario } from '../models/Comentario.js';
import { badRequest, notFound } from '../middlewares/errorHandler.js';

const router = Router();

// GET /api/publicaciones - Lista publicaciones con filtros y paginación
router.get('/', async (req, res, next) => {
    try {
        const { q, usuarioId, pagina = 1, limite = 10, titulo, cuerpo } = req.query;
        
        const offset = (pagina - 1) * limite;
        const where = {};
        
        // Filtro por usuarioId
        if (usuarioId) {
            where.usuarioId = usuarioId;
        }
        
        // Filtro por título
        if (titulo) {
            const { Op } = await import('sequelize');
            where.titulo = { [Op.like]: `%${titulo}%` };
        }
        
        // Filtro por cuerpo
        if (cuerpo) {
            const { Op } = await import('sequelize');
            where.cuerpo = { [Op.like]: `%${cuerpo}%` };
        }
        
        // Filtro general por query (busca en título o cuerpo)
        if (q) {
            const { Op } = await import('sequelize');
            where[Op.or] = [
                { titulo: { [Op.like]: `%${q}%` } },
                { cuerpo: { [Op.like]: `%${q}%` } }
            ];
        }
        
        const publicaciones = await Publicacion.findAll({
            where,
            limit: parseInt(limite),
            offset: parseInt(offset),
            order: [['id', 'ASC']], // Orden por defecto: id ascendente
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: ['id', 'nombre', 'correo']
            }]
        });
        
        res.json(publicaciones);
    } catch (error) {
        next(error);
    }
});

// GET /api/publicaciones/:id - Detalle de publicación
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const publicacion = await Publicacion.findByPk(id, {
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: ['id', 'nombre', 'correo']
            }]
        });
        
        if (!publicacion) {
            throw notFound('Publicación no encontrada');
        }
        
        res.json(publicacion);
    } catch (error) {
        next(error);
    }
});

// POST /api/publicaciones - Crear publicación
router.post('/', async (req, res, next) => {
    try {
        const { usuarioId, titulo, cuerpo } = req.body;
        
        // Validar datos requeridos
        if (!usuarioId) {
            throw badRequest('El usuarioId es obligatorio');
        }
        if (!titulo?.trim() || !cuerpo?.trim()) {
            throw badRequest('Título y cuerpo son obligatorios');
        }
        
        // Verificar que el usuario existe
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            throw notFound('El usuario especificado no existe');
        }
        
        const publicacion = await Publicacion.create({
            usuarioId,
            titulo: titulo.trim(),
            cuerpo: cuerpo.trim()
        });
        
        // Recargar con datos del usuario
        await publicacion.reload({
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: ['id', 'nombre', 'correo']
            }]
        });
        
        res.status(201).json(publicacion);
    } catch (error) {
        next(error);
    }
});

// PUT /api/publicaciones/:id - Actualizar publicación (parcial)
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { titulo, cuerpo } = req.body;
        
        const publicacion = await Publicacion.findByPk(id);
        
        if (!publicacion) {
            throw notFound('Publicación no encontrada');
        }
        
        // Validar que los strings no estén vacíos si se envían
        if (titulo !== undefined && !titulo?.trim()) {
            throw badRequest('El título no puede estar vacío');
        }
        if (cuerpo !== undefined && !cuerpo?.trim()) {
            throw badRequest('El cuerpo no puede estar vacío');
        }
        
        // Actualizar solo los campos enviados
        if (titulo) publicacion.titulo = titulo.trim();
        if (cuerpo) publicacion.cuerpo = cuerpo.trim();
        
        await publicacion.save();
        
        // Recargar con datos del usuario
        await publicacion.reload({
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: ['id', 'nombre', 'correo']
            }]
        });
        
        res.json(publicacion);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/publicaciones/:id - Eliminar publicación
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const publicacion = await Publicacion.findByPk(id);
        
        if (!publicacion) {
            throw notFound('Publicación no encontrada');
        }
        
        await publicacion.destroy();
        
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

// GET /api/publicaciones/:id/comentarios - Lista comentarios de la publicación
router.get('/:id/comentarios', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { pagina = 1, limite = 10 } = req.query;
        
        const publicacion = await Publicacion.findByPk(id);
        
        if (!publicacion) {
            throw notFound('Publicación no encontrada');
        }
        
        const offset = (pagina - 1) * limite;
        
        const comentarios = await Comentario.findAll({
            where: { publicacionId: id },
            limit: parseInt(limite),
            offset: parseInt(offset),
            order: [['id', 'ASC']]
        });
        
        res.json(comentarios);
    } catch (error) {
        next(error);
    }
});

// POST /api/publicaciones/:id/comentarios - Agregar comentario a publicación
router.post('/:id/comentarios', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, correo, cuerpo } = req.body;
        
        // Verificar que la publicación existe
        const publicacion = await Publicacion.findByPk(id);
        if (!publicacion) {
            throw notFound('Publicación no encontrada');
        }
        
        // Validar datos requeridos
        if (!nombre?.trim() || !correo?.trim() || !cuerpo?.trim()) {
            throw badRequest('Nombre, correo y cuerpo son obligatorios');
        }
        
        const comentario = await Comentario.create({
            publicacionId: id,
            nombre: nombre.trim(),
            correo: correo.trim(),
            cuerpo: cuerpo.trim()
        });
        
        res.status(201).json(comentario);
    } catch (error) {
        next(error);
    }
});

export default router;