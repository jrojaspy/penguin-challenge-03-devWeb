import * as service from '../services/links.service.js';
import { parseId, parseLinkInput } from '../validators.js';
import { HttpError } from '../middleware/errorHandler.js';

const voterOf = (req) => req.get('X-Voter-Id') ?? null;

export function list(req, res) {
  const tag = req.query.tag ? String(req.query.tag).trim().toLowerCase() : null;
  const q = req.query.q ? String(req.query.q).trim() : null;
  res.json(service.listLinks({ tag: tag || null, q: q || null, voterId: voterOf(req) }));
}

export function get(req, res) {
  const link = service.getLink(parseId(req.params.id), voterOf(req));
  if (!link) throw new HttpError(404, 'NOT_FOUND', 'Enlace no encontrado');
  res.json(link);
}

export function create(req, res) {
  const id = service.createLink(parseLinkInput(req.body));
  res.status(201).location(`/api/links/${id}`).json(service.getLink(id, voterOf(req)));
}