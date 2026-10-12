import { castVote } from '../services/votes.service.js';
import { linkExists } from '../services/links.service.js';
import { parseId, parseVoteInput, requireVoterId } from '../validators.js';
import { HttpError } from '../middleware/errorHandler.js';

export function create(req, res) {
  const linkId = parseId(req.params.id);
  const voterId = requireVoterId(req);
  const value = parseVoteInput(req.body);
  if (!linkExists(linkId)) throw new HttpError(404, 'NOT_FOUND', 'Enlace no encontrado');
  res.json(castVote(linkId, voterId, value));
}
