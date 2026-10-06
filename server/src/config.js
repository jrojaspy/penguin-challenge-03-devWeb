import 'dotenv/config.js';
import { resolve } from 'node:path';

export const config = {
    port: Number(process.env.PORT ?? 3000),
    dbPath: resolve(process.cwd(), process.env.DB_PATH ?? 'data/links.db'), // operador de coalescência nula (??) para fornecer um valor padrão caso process.env.DB_PATH seja undefined ou null
    nodeEnv: process.env.NODE_ENV ?? 'development',
};