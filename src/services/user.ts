import { CategoryModel } from "@/models/category.schema";
import { UserModel } from "@/models/user.schema";
import { UserType } from "@/utils/types/user";
import jwt from "jsonwebtoken";

export const loginUser = async (email: string, password: string) => {
  try {
    const users = await getUsers();
    const gotUsers = users.find(
      (users) => users.email === email && users.password === password
    );
    if (!gotUsers) {
      throw new Error("aaaaaaa");
    }
    const key = process.env.PRIVATE_KEY;
    if (!key) {
      throw new Error("eeeeeee");
    }
    const userInfo = {
      email: gotUsers.email,
      password: gotUsers.password,
      name: "admin",
    };
    const newToken = jwt.sign(userInfo, key, {
      expiresIn: "1h",
    });
    return newToken;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  address: string
) => {
  const createUser = UserModel.create({
    name,
    email,
    password,
    address,
  });
  return createUser;
};

export const getUsers = async (): Promise<UserType[]> => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getUser = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email: email });
    if (user != null) {
      return { message: "user found" };
    } else return new Error();
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getUsersById = async (email: string, password: string) => {
  console.log("email:", email);
  console.log("password:", password);
  try {
    const user = await UserModel.findOne({ email: email });
    if (user.password == password) {
      return { message: "valid" };
    } else return new Error();
  } catch (e: any) {
    return e.message;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await CategoryModel.deleteOne({ _id: id });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const updateUser = async (email: string, password: string) => {
  try {
    await UserModel.updateOne({ email }, { password });
    return { message: "successful" };
  } catch (e: any) {
    throw new Error(e.message);
  }
};
