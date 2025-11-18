import { Router } from 'express';
import { Op } from 'sequelize';

// Importamos los modelos
import Publicacion from '../models/Publicacion.js';
import Usuario from '../models/Usuario.js'; // Lo necesitamos para validar POST
import Comentario from '../models/Comentario.js'; // Lo necesitamos para las rutas anidadas

const router = Router();

// CRUD de Publicaciones

// GET /api/publicaciones
router.get('/', async (req, res) => {
  try {
    // 1. Lectura de Query Params
    const { q, usuarioId, pagina = 1, limite = 10 } = req.query;
    const offset = (Number(pagina) - 1) * Number(limite);

    // 2. Configuración del filtro 'where'
    // Usamos [Op.and] para que todos los filtros se deban cumplir
    const where = { [Op.and]: [] };

    // Filtro por usuarioId (si se provee)
    if (usuarioId) {
      where[Op.and].push({ usuarioId: usuarioId });
    }

    // Filtro 'q' (si se provee)
    if (q) {
      // Busca 'q' en titulo O cuerpo
      where[Op.and].push({
        [Op.or]: [
          { titulo: { [Op.like]: `%${q}%` } },
          { cuerpo: { [Op.like]: `%${q}%` } }
        ]
      });
    }

    // 3. Consulta a la BD
    const { count, rows } = await Publicacion.findAndCountAll({
      where: where,
      limit: Number(limite),
      offset: offset,
      order: [['id', 'ASC']],
      // Opcional: Incluir el autor
      // include: { model: Usuario, attributes: ['id', 'nombre'] }
    });

    // 4. Respuesta
    res.json({
      total: count,
      items: rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, mensaje: 'Error al obtener publicaciones' });
  }
});

//GET /api/publicaciones/:id

router.get('/:id', async (req, res) => {
  try {
    const publicacion = await Publicacion.findByPk(req.params.id);
    if (!publicacion) {
      return res.status(404).json({ error: true, mensaje: 'Publicación no encontrada' });
    }
    res.json(publicacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, mensaje: 'Error al obtener la publicación' });
  }
});

// POST /api/publicaciones
router.post('/', async (req, res) => {
  try {
    const { usuarioId, titulo, cuerpo } = req.body;

    // Regla de negocio: Validar que el usuario (usuarioId) exista [cite: 67]
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: true, mensaje: 'Usuario no encontrado' });
    }

    // Crear la publicación
    const nuevaPublicacion = await Publicacion.create({ usuarioId, titulo, cuerpo });
    
    res.status(201).json(nuevaPublicacion);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(409).json({ error: true, mensaje: error.errors.map(e => e.message).join(', ') });
    }
    console.error(error);
    res.status(500).json({ error: true, mensaje: 'Error al crear la publicación' });
  }
});

// PUT /api/publicaciones/:id
router.put('/:id', async (req, res) => {
  try {
    const publicacion = await Publicacion.findByPk(req.params.id);
    if (!publicacion) {
      return res.status(404).json({ error: true, mensaje: 'Publicación no encontrada' });
    }

    // Actualizamos solo los campos permitidos
    publicacion.titulo = req.body.titulo ?? publicacion.titulo;
    publicacion.cuerpo = req.body.cuerpo ?? publicacion.cuerpo;
    
    await publicacion.save(); // .save() ejecuta las validaciones y hooks
    
    res.json(publicacion);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(409).json({ error: true, mensaje: error.errors.map(e => e.message).join(', ') });
    }
    console.error(error);
    res.status(500).json({ error: true, mensaje: 'Error al actualizar la publicación' });
  }
});

// DELETE /api/publicaciones/:id
router.delete('/:id', async (req, res) => {
  try {
    const publicacion = await Publicacion.findByPk(req.params.id);
    if (!publicacion) {
      return res.status(404).json({ error: true, mensaje: 'Publicación no encontrada' });
    }

    await publicacion.destroy(); // Sequelize se encarga del 'ON DELETE CASCADE'
    
    res.status(200).json({ mensaje: 'Publicación eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, mensaje: 'Error al eliminar la publicación' });
  }
});


// Endpoints Anidados de Comentarios 

// GET /api/publicaciones/:id/comentarios
router.get('/:id/comentarios', async (req, res) => {
  try {
    const publicacionId = req.params.id;
    // 1. Verificamos que la publicación exista
    const publicacion = await Publicacion.findByPk(publicacionId);
    if (!publicacion) {
      return res.status(404).json({ error: true, mensaje: 'Publicación no encontrada' });
    }

    // 2. Buscamos todos los comentarios asociados
    const comentarios = await Comentario.findAll({
      where: { publicacionId: publicacionId }
    });
    
    res.json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, mensaje: 'Error al obtener los comentarios' });
  }
});

// POST /api/publicaciones/:id/comentarios
router.post('/:id/comentarios', async (req, res) => {
  try {
    const publicacionId = req.params.id;
    const { nombre, correo, cuerpo } = req.body;

    // 1. Verificamos que la publicación exista [cite: 68]
    const publicacion = await Publicacion.findByPk(publicacionId);
    if (!publicacion) {
      return res.status(404).json({ error: true, mensaje: 'Publicación no encontrada' });
    }

    // 2. Creamos el comentario
    const nuevoComentario = await Comentario.create({
      nombre,
      correo,
      cuerpo,
      publicacionId: publicacionId // Lo asociamos a la publicación
    });
    
    res.status(201).json(nuevoComentario);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(409).json({ error: true, mensaje: error.errors.map(e => e.message).join(', ') });
    }
    console.error(error);
    res.status(500).json({ error: true, mensaje: 'Error al crear el comentario' });
  }
});


export default router;