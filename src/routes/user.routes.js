import express from 'express';
//import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { followUser,getUserProfile } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get("/:username",getUserProfile);
router.post('/:id/follow',protect,followUser);

export default router;
