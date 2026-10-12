import { addComment } from '../services/comments.service.js';
import { linkExists } from '../services/links.service.js';
import { parseId, parseCommentInput } from '../validators.js';
import { HttpError } from '../middleware/errorHandler.js';

export function create(req, res) {
  const linkId = parseId(req.params.id);
  if (!linkExists(linkId)) throw new HttpError(404, 'NOT_FOUND', 'Enlace no encontrado');
  const comment = addComment(linkId, parseCommentInput(req.body));
  res.status(201).json(comment);
}
