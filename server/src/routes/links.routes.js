import { Router } from 'express';
import * as links from '../controllers/links.controller.js';

const router = Router();

router.get('/', links.list);
router.post('/', links.create);
router.get('/:id', links.get);
// (comments y votes se agregan en el commit 4)

export default router;