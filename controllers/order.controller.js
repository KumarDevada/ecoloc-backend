import Cart from '../models/cart.js';
import User from '../models/user.js';
import Order from '../models/order.js';

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.userInfo.userId;
        const cart = await Cart.findOne({ userId: userId });
        const user = await User.findById(userId);
        const ordersList = cart.orders;
        let price = 0;
        ordersList.forEach(async (orderId) => {
            const order = await Order.findById(orderId);
            order.isInCart = false;
            user.numberOfItemsRecycled += 1
            price += order.price;
            user.walletAmount += order.price;
            user.treesPlanted = user.walletAmount / 555;
            await order.save();
        });

        const credits = Math.round(price * (0.05))
        user.credits = credits;

        await user.save();

        return res.status(200).json({ success: true, message: 'cart checked out' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}