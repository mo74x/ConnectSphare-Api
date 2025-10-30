import express from 'express';
import { getPosts,deletePost,createPost ,likePost,createCommentOnPost,getCommentsForPost} from '../controllers/post.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router=express.Router();

router.route('/')
  .post(protect, createPost)
  .get(getPosts);

router.route('/:id')
  .delete(protect, deletePost);

router.post('/:id/like', protect, likePost);


router.route('/:id/comments')
  .post(protect, createCommentOnPost)
  .get(getCommentsForPost);

export default router;