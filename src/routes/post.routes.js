import express from 'express';
import { getPosts,deletePost,createPost ,likePost} from '../controllers/post.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router=express.Router();

router.post('/',protect,createPost);
router.get('/',getPosts);
router.delete('/:id',protect,deletePost);
router.post('/:id/like', protect, likePost);

export default router;