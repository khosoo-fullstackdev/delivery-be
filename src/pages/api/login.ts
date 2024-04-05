// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { corsAllow } from "@/helper/cors";
import connect from "@/helper/db";
import { loginUser } from "@/services/user";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
  token?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connect();
  corsAllow(req, res);
  const data = req.body;
  const { email, password } = data;

  try {
    const token = await loginUser(email, password);
    if (token) {
      return res
        .status(200)
        .json({ token: token, message: "Login successful" });
    }
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
}
