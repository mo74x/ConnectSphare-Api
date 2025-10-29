import express from 'express';
import { getPosts,deletePost,createPost } from '../controllers/post.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router=express.Router();

router.post('/',protect,createPost);
router.get('/',getPosts);
router.delete('/:id',protect,deletePost);

export default router;