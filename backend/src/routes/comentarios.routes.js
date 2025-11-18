import { Router } from 'express';

// Importamos el modelo
import Comentario from '../models/Comentario.js';

const router = Router();

// DELETE /api/comentarios/:id
router.delete('/:id', async (req, res) => {
  try {
    const comentario = await Comentario.findByPk(req.params.id);
    if (!comentario) {
      return res.status(404).json({ error: true, mensaje: 'Comentario no encontrado' });
    }

    await comentario.destroy();
    
    res.status(200).json({ mensaje: 'Comentario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, mensaje: 'Error al eliminar el comentario' });
  }
});

export default router;