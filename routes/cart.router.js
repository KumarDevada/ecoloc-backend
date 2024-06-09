import express from 'express';
import { placeOrder } from '../controllers/order.controller.js';
import { addItemToCart, removeItem } from '../controllers/cart.controller.js';
import { verifyAccessToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('', verifyAccessToken, addItemToCart);
router.post('/checkOut', verifyAccessToken, placeOrder);
router.delete('/:orderId', verifyAccessToken, removeItem);

export default router