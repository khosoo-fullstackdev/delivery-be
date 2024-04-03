import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  password: String,
  address: String,
  createdAt: Date,
  updatedAt: Date,
});

export const UserModel = mongoose.models.User || model("User", UserSchema);
