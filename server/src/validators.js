import { HttpError } from './middleware/errorHandler.js';

const fail = (message) => {
  throw new HttpError(400, 'VALIDATION_ERROR', message);
};

export function parseId(raw) {
  const id = Number(raw);
  if (!Number.isInteger(id) || id < 1) fail('El id debe ser un entero positivo');
  return id;
}

export function parseLinkInput(body = {}) {
  const url = String(body.url ?? '').trim();
  const title = String(body.title ?? '').trim();
  const description = String(body.description ?? '').trim();

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    fail('La URL no es válida');
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) fail('La URL debe empezar con http:// o https://');
  if (title.length < 3 || title.length > 120) fail('El título debe tener entre 3 y 120 caracteres');
  if (description.length > 500) fail('La descripción no puede superar 500 caracteres');

  const raw = Array.isArray(body.tags) ? body.tags : String(body.tags ?? '').split(',');
  const tags = [...new Set(raw.map((t) => String(t).trim().toLowerCase()).filter(Boolean))];
  if (tags.length > 5) fail('Máximo 5 etiquetas');
  if (tags.some((t) => !/^[\p{L}\p{N}-]{1,30}$/u.test(t))) {
    fail('Las etiquetas solo admiten letras, números y guiones (máx. 30 caracteres)');
  }

  return { url: parsed.href, title, description, tags };
}

export function parseCommentInput(body = {}) {
  const author = String(body.author ?? '').trim();
  const text = String(body.body ?? '').trim();
  if (author.length < 2 || author.length > 40) fail('El autor debe tener entre 2 y 40 caracteres');
  if (text.length < 1 || text.length > 500) fail('El comentario debe tener entre 1 y 500 caracteres');
  return { author, body: text };
}

export function parseVoteInput(body = {}) {
  const value = Number(body.value);
  if (![-1, 0, 1].includes(value)) fail('El voto debe ser 1, -1 o 0 (quitar voto)');
  return value;
}

export function requireVoterId(req) {
  const voterId = req.get('X-Voter-Id');
  if (!voterId || voterId.length < 8 || voterId.length > 64) {
    fail('Falta la cabecera X-Voter-Id (entre 8 y 64 caracteres)');
  }
  return voterId;
}
