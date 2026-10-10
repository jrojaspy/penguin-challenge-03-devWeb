import { Router } from 'express';
import * as tags from '../controllers/tags.controller.js';

const router = Router();
router.get('/', tags.list);
export default router;