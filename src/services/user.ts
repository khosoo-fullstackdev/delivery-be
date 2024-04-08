import { CategoryModel } from "@/models/category.schema";
import { UserModel } from "@/models/user.schema";
import { UserType } from "@/utils/types/user";
import jwt from "jsonwebtoken";

export const loginUser = async (email: string, password: string) => {
  const userInfo = {
    email: email,
    password: password,
    name: "admin",
  };
  try {
    const [gotUsers] = await getUsers();
    console.log(gotUsers);
    if (gotUsers.email == email && gotUsers.password == password) {
      const newToken = jwt.sign(userInfo, process.env.PRIVATE_KEY as string, {
        expiresIn: "1h",
      });
      return newToken;
    } else {
      return "iim hereglegch alga";
    }
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

export const geUsersById = async (id: string) => {
  try {
    const food = await CategoryModel.findOne({ _id: id });
    return food;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await CategoryModel.deleteOne({ _id: id });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const updateUser = async (id: string, updateInfo: Partial<UserType>) => {
  try {
    await CategoryModel.updateOne({ _id: id }, { updateInfo });
  } catch (e: any) {
    throw new Error(e.message);
  }
};
