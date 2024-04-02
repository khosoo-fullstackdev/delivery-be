import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "@/services/user";
import connect from "@/helper/db";
import NextCors from "nextjs-cors";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  connect();
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await createUser(firstName, lastName, email, password);
    res.status(200).json({ message: "user created successfully" });
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};
export default register;
