// Middleware para rutas no encontradas (404)
export const notFound = (req, res) => {
    res.status(404).json({
        error: true,
        mensaje: 'Ruta no encontrada'
    });
};