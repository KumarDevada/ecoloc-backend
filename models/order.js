import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cartId: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
    product: { type: String },
    credits: { type: Number },
    price: { type: Number },
    isInCart: { type: Boolean, default: true },
    orderedDate: { type: Date, default: Date.now },
});

export default mongoose.model('Order', OrderSchema);