import { UserModel } from "@/models/user-schema";
import jwt from "jsonwebtoken";

export const loginService = async (email: string, password: string) => {
  if (email == "admin@gmail.com" && password == "admin") {
    const userInfo = {
      email: email,
      name: "Khosoo",
    };
    const adminToken = jwt.sign(userInfo, "my-super-duper-secret-key", {
      expiresIn: "1h",
    });
    return adminToken;
  } else {
    const userInfo = {
      email: email,
      name: "John Doe",
    };
    const userToken = jwt.sign(userInfo, "my-super-duper-secret-key", {
      expiresIn: "1h",
    });
    return userToken;
  }
};

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const createUser = UserModel.create({ firstName, lastName, email, password });
  return createUser;
};
