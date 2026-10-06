import express from 'express';
import cors from 'cors'; // habilitar cors para todas las rutas
import { notFound, errorHandler } from './middleware/errorHandler.js';

export const app = express();

app.use(cors());
app.use(express.json( { limit: '10kb' } ));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Rutas de la API

app.use(notFound);
app.use(errorHandler);