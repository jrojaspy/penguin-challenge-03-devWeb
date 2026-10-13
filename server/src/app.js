import express from 'express';
import cors from 'cors'; // habilitar cors para todas las rutas
import linksRouter from './routes/links.routes.js';
import tagsRouter from './routes/tags.routes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const app = express();
const here = dirname(fileURLToPath(import.meta.url));
const clientDist = resolve(here, '../../client/dist');

app.use(cors());
app.use(express.json( { limit: '10kb' } ));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Rutas de la API
app.use('/api/links', linksRouter);
app.use('/api/tags', tagsRouter);

if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
  // Fallback de la SPA: cualquier ruta que no sea /api devuelve index.html
  app.get(/^\/(?!api\/).*/, (req, res) => res.sendFile(resolve(clientDist, 'index.html')));
}

app.use(notFound);
app.use(errorHandler);