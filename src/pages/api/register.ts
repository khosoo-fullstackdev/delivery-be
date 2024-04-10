import { corsAllow } from "@/helper/cors";
import connect from "@/helper/db";
import type { NextApiResponse, NextApiRequest } from "next";
import { createUser } from "@/services/user";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  corsAllow(req, res);
  if (
    !req.body?.name ||
    !req.body?.email ||
    !req.body?.address ||
    !req.body?.password
  ) {
    res.status(400).json("firstName, lastName,email is missing");
  }
  await connect();

  const { name, email, password, address } = req.body;

  try {
    const user = await createUser(name, email, password, address);

    res.status(200).json({ message: "user created successfully", user });
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};

export default register;
