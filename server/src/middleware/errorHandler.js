export class HttpError extends Error { // Clase personalizada para manejar errores HTTP
    constructor(status, code, message) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

export function notFound(req, res, next) { // Middleware para manejar rutas no encontradas
    next(new HttpError(404, 'NOT_FOUND', `La ruta ${req.method} ${req.originalUrl} no existe`));
}

export function errorHandler(err, req, res, next) { // Middleware para manejar errores
    if (err instanceof HttpError) { // Manejo de errores HTTP personalizados
        return res.status(err.status).json({ error: { code: err.code, message: err.message } });
    }
    if (err.type === 'entity.parse.failed') { // Manejo de errores de parseo de JSON
        return res.status(400).json({ error: { code: 'INVALID_JSON', message: 'el cuerpo no es un json valido' } });
    }
    console.error(err);
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Error interno del servidor' } });
}