import { listTags } from '../services/tags.service.js';

export const list = (req, res) => res.json(listTags());