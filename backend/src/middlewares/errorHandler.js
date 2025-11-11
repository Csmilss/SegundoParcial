// Middleware para manejo de errores
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.statusCode || 500;
    const mensaje = err.message || 'Error interno del servidor';
    
    res.status(statusCode).json({
        error: true,
        mensaje: mensaje
    });
};

// Clase de error personalizado para facilitar el manejo
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Funciones auxiliares para crear errores específicos
export const badRequest = (mensaje = 'Solicitud incorrecta') => {
    return new AppError(mensaje, 400);
};

export const notFound = (mensaje = 'Recurso no encontrado') => {
    return new AppError(mensaje, 404);
};

export const conflict = (mensaje = 'Conflicto con el recurso existente') => {
    return new AppError(mensaje, 409);
};

export const serverError = (mensaje = 'Error interno del servidor') => {
    return new AppError(mensaje, 500);
};
