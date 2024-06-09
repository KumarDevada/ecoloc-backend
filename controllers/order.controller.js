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
            const order = await Order.findById(orderId.toString());
            console.log(order);
            order.isInCart = false;
            user.numberOfItemsRecycled += 1
            price += order.price;
            user.walletAmount += order.price;
            user.treesPlanted = user.walletAmount / 555;
            await order.save();
        });

        const totalCredits = Math.round(price * (0.05))
        user.credits = totalCredits;

        await user.save();
        const { username, credits, treesPlanted, numberOfItemsRecycled, walletAmount } = user;
        const userInfo = { username, credits, treesPlanted, numberOfItemsRecycled, walletAmount }
        return res.status(200).json({ success: true, message: 'cart checked out', data: {...userInfo} });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}