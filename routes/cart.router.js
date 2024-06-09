import express from 'express';
import { placeOrder } from '../controllers/order.controller.js';
import { addItemToCart, removeItem } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('', addItemToCart);
router.post('/checkOut', placeOrder);
router.delete('/:orderId', removeItem);

export default router