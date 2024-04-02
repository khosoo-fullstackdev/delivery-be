import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    require: true,
  },
  passowrd: {
    type: String,
    require: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

export const UserModel = mongoose.models.User || model("User", UserSchema);
