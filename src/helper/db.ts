import mongoose from "mongoose";

const url: string = process.env.MONGODB_URL as string;

const connect = async () => {
  try {
    await mongoose.connect(url);
    console.log("database is connected");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
