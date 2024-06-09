import Cart from '../models/cart.js';
import Order from '../models/order.js';

export const getAllItems = async (req, res) => {
    try {
        const userId = req.user.userInfo.userId;
        // const itemsList = await Cart.findOne({ userId: userId });
        // await itemsList.populate('orders');
        const itemsList = await Order.find({ userId: userId, isInCart: true });
        return res.status(200).json({ success: true, data: itemsList });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const addItemToCart = async (req, res) => {
    try {
        const userId = req.user.userInfo.userId;
        // let cart = await Cart.findOne({ userId: userId });
        // if(!cart) {
        //     cart = new Cart({ userId: userId, orders: [] });
        //     await cart.save();
        // }

        // const cartId = cart._id;
        const { product, price } = req.body;
        const newOrder = new Order({ userId: userId, product: product, price: price });
        await newOrder.save();
        
        // cart.orders.push(newOrder._id);
        
        // await cart.save();

        return res.status(200).json({ success: true, message: 'item added to cart' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const removeItem = async (req, res) => {
    try {
        const userId = req.user.userInfo.userId;
        // const cart = await Cart.findOne({ userId: userId });
        const orderId = req.params.orderId;
        // cart.orders = cart.orders.filter(order => {
        //     return order.toString() !== orderId;
        // });
        // await cart.save();
        await Order.findByIdAndDelete(orderId);

        return res.status(200).json({ success: true, message: 'item removed from cart' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: true, message: error.message });   
    }
}