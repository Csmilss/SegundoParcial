

import { Router } from 'express';
import { Comentario } from '../models/Comentario.js';
import { notFound } from '../middlewares/errorHandler.js';

const router = Router();

// DELETE /api/comentarios/:id - Eliminar comentario
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const comentario = await Comentario.findByPk(id);
        
        if (!comentario) {
            throw notFound('Comentario no encontrado');
        }
        
        await comentario.destroy();
        
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;
