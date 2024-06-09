import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    credits: { type: Number, default: 0},
    treesPlanted: { type: Number, default: 0},
    walletAmount: { type: Number, default: 0 },
    numberOfItemsRecycled: { type: Number, default: 0}
});

export default mongoose.model('User', UserSchema);