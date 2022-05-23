import { Schema, model } from "mongoose";

const cartSchema = new Schema ({
    idUser: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    products: [{
        type: Schema.Types.ObjectId, ref: 'Product'
    }],
    amount: {
        type: Number,
        min: 1, max: 20
    }
}, { versionKey: false });

export default model("Cart", cartSchema);