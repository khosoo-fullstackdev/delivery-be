import mongoose from "mongoose";

const uri: string = process.env.MONGODB_URL as string;
const connect = async () => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
};

export default connect;
