import { number, string } from "joi";
import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 80 },
    description: { type: String, required: true, maxlength: 150 },
    price: { type: Number, required: true, min: 1, max: 30000 },
    category: { type: String, required: true, maxlength: 50 },
    amount: { type: Number, required: true },
    imgURL: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Product", productSchema);
