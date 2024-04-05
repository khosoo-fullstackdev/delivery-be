import mongoose, { model, Schema } from "mongoose";

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderNumber: Number,
  foods: Array,
  totalPrice: Number,
  duureg: String,
  horoo: String,
  apartment: String,
  createdAt: Date,
  updatedAt: Date,
});

export const OrderModel = mongoose.models.Order || model("Order", OrderSchema);
