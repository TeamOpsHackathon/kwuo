import express from 'express';
//Please help implement an authentication middleware
import { addComment, replyToComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/', protect, addComment);
router.post('/:postId/reply/:commentId', protect, replyToComment);

export default router;
