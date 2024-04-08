import mongoose, { model, Schema } from "mongoose";

const FoodSchema = new Schema({
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  category: String,
  FoodName: String,
  price: Number,
  imagePath: String,
  ingredients: Array,
  sale: Number,
});

export const FoodModel = mongoose.models.Food || model("Food", FoodSchema);
