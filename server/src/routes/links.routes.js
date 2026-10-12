import { Router } from 'express';
import * as links from '../controllers/links.controller.js';
import * as comments from '../controllers/comments.controller.js';
import * as votes from '../controllers/votes.controller.js';

const router = Router();

router.get('/', links.list);
router.post('/', links.create);
router.get('/:id', links.get);
router.post('/:id/comments', comments.create);
router.post('/:id/votes', votes.create);
// (comments y votes se agregan en el commit 4)

export default router;
