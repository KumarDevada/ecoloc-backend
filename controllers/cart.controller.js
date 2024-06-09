import Cart from '../models/cart.js';
import order from '../models/order.js';
import Order from '../models/order.js';

export const getAllItems = async (req, res) => {
    try {
        const userId = req.user.userInfo.userId;
        const itemsList = await Cart.find({ userId: userId }).populate('orders');
        console.log(itemsList);
        return res.status(200).json({ success: true, data: itemsList.orders });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const addItemToCart = async (req, res) => {
    try {
        const userId = req.user.userInfo.userId;
        let cart = await Cart.findOne({ userId: userId });
        if(!cart) {
            cart = new Cart({ userId: userId, orders: [] });
            await cart.save();
        }

        const cartId = cart._id;
        const { product, price } = req.body;
        const newOrder = new Order({ userId: userId, cartId: cartId, product: product, price: price });
        
        cart.orders.push(newOrder._id);
        await newOrder.save();
        await cart.save();

        return res.status(200).json({ success: true, message: 'item added to cart' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const removeItem = async (req, res) => {
    try {
        const userId = req.user.userInfo.userId;
        const cart = await Cart.findOne({ userId: userId });
        const orderId = req.params.orderId;
        cart.orders = cart.orders.filter(order => {
            return order.toString() !== orderId;
        });
        await cart.save();

        return res.status(200).json({ success: true, message: 'item removed from cart' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: true, message: error.message });   
    }
}