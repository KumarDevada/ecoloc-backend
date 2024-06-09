import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const CartSchema  = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order', required: true }],
});

export default mongoose.model('Cart', CartSchema);