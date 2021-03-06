import { Schema, model } from "mongoose";

const shoppingSchema = new Schema ({
    idUser: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    idProduct: [{
        type: Schema.Types.ObjectId, ref: 'Product'
    }],
    amount: {
        type: Number,
        min: 1, max: 20
    }
}, { versionKey: false });

export default model("Shopping", shoppingSchema);