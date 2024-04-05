import mongoose from "mongoose";

const uri: string = process.env.MONGODB_URL as string;
const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
