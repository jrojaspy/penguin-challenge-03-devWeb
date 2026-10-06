import Database from 'better-sqlite3'; // libreria para manejar la base de datos SQLite
import { readFileSync, mkdirSync } from 'node:fs'; // libreria para manejar el sistema de archivos
import { dirname, resolve } from 'node:path'; // libreria para manejar rutas de archivos
import { fileURLToPath } from 'node:url'; // libreria para manejar rutas de archivos
import { config } from '../config.js';

const here = dirname(fileURLToPath(import.meta.url)); // obtiene la ruta del directorio actual

mkdirSync(dirname(config.dbPath), { recursive: true }); // crea el directorio de la base de datos si no existe

export const db = new Database(config.dbPath); // crea la base de datos SQLite

db.pragma('journal_mode = WAL'); // habilita el modo WAL (Write-Ahead Logging) para mejorar el rendimiento
db.pragma('foreign_keys = ON'); // habilita las claves foráneas
db.exec(readFileSync(resolve(here, 'schema.sql'), 'utf8')); // ejecuta el script SQL para crear las tablas de la base de datos