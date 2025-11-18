import { Router } from 'express';
import { Op } from 'sequelize';

// Importamos los modelos (¡asegúrate de que las rutas sean correctas!)
import Usuario from '../models/Usuario.js';
import Publicacion from '../models/Publicacion.js';

const router = Router();

// --- CRUD de Usuarios ---
//GET /api/usuarios
router.get('/', async (req, res) => {
  try {
    // 1. Lectura de Query Params
    const { q, pagina = 1, limite = 10 } = req.query;
    const offset = (Number(pagina) - 1) * Number(limite);

    // 2. Configuración del filtro 'where'
    let where = {};
    if (q) {
      // Filtro 'q' busca por nombre O correo
      where[Op.or] = [
        { nombre: { [Op.like]: `%${q}%` } },
        { correo: { [Op.like]: `%${q}%` } }
      ];
    }

    // 3. Consulta a la BD
    const { count, rows } = await Usuario.findAndCountAll({
      where: where,
      limit: Number(limite),
      offset: offset,
      order: [['id', 'ASC']], // Orden por defecto
    });

    // 4. Respuesta
    res.json({
      total: count,
      items: rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, mensaje: 'Error al obtener usuarios' });
  }
});

// GET /api/usuarios/:id
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: true, mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, mensaje: 'Error al obtener el usuario' });
  }
});

// POST /api/usuarios
router.post('/', async (req, res) => {
  try {
    const { nombre, correo, ciudad } = req.body;

    // Sequelize ejecutará las validaciones (notEmpty, isEmail, unique)
    const nuevoUsuario = await Usuario.create({ nombre, correo, ciudad });
    
    // 201 = Creado exitosamente
    res.status(201).json(nuevoUsuario); 
  } catch (error) {
    // Manejo de errores de validación de Sequelize
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: true, mensaje: error.errors.map(e => e.message).join(', ') });
    }
    console.error(error);
    res.status(500).json({ error: true, mensaje: 'Error al crear el usuario' });
  }
});

// PUT /api/usuarios/:id
router.put('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: true, mensaje: 'Usuario no encontrado' });
    }

    // .set() actualiza solo los campos que vienen en el body
    // Esto es perfecto para la actualización parcial (nombre?, correo?)
    usuario.set(req.body);
    
    // .save() ejecuta las validaciones antes de guardar
    await usuario.save(); 
    
    res.json(usuario);
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: true, mensaje: error.errors.map(e => e.message).join(', ') });
    }
    console.error(error);
    res.status(500).json({ error: true, mensaje: 'Error al actualizar el usuario' });
  }
});

/**
 * DELETE /api/usuarios/:id
 * Elimina un usuario
 */
router.delete('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: true, mensaje: 'Usuario no encontrado' });
    }

    await usuario.destroy();
    
    // 200 OK (con mensaje) o 204 No Content (vacío) son válidos
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, mensaje: 'Error al eliminar el usuario' });
  }
});

// --- Endpoints Anidados ---

/**
 * GET /api/usuarios/:id/publicaciones
 * Obtiene todas las publicaciones de UN usuario
 */
router.get('/:id/publicaciones', async (req, res) => {
  try {
    const usuarioId = req.params.id;
    // 1. Verificamos que el usuario exista
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: true, mensaje: 'Usuario no encontrado' });
    }

    // 2. Buscamos todas las publicaciones asociadas
    const publicaciones = await Publicacion.findAll({
      where: { usuarioId: usuarioId }
    });
    
    res.json(publicaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, mensaje: 'Error al obtener las publicaciones del usuario' });
  }
});


export default router;