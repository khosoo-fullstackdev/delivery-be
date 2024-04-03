import { corsAllow } from "@/helper/cors";
import { createUser } from "@/services/user";
import type { NextApiResponse, NextApiRequest } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  corsAllow(req, res);
  if (
    !req.body?.name ||
    !req.body?.email ||
    !req.body?.address ||
    !req.body?.password
  ) {
    res.status(400).json("firstName, lastName,email is missing");
  }

  const { name, email, password, address } = req.body;

  try {
    const user = await createUser(name, email, password, address);

    res.status(200).json({ message: "user created successfully", user });
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};

export default handler;
