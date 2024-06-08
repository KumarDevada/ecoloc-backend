import express from 'express';
import { createUser, redeemCredits, userLogin } from '../controllers/user.controller.js';
import { verifyAccessToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('', createUser);
router.post('/login', userLogin);
router.patch('/redeem', verifyAccessToken ,redeemCredits);

export default router;