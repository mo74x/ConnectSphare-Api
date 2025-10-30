import express from 'express';
const router= express.Router();
import { getfeed } from '../controllers/feed.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

router.get('/',protect,getfeed);

export default router;