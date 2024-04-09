// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { corsAllow } from "@/helper/cors";
import connect from "@/helper/db";
import { loginUser } from "@/services/user";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
  token?: string | any;
  response?: any;
};

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connect();
  await corsAllow(req, res);
  const body = req.body;

  try {
    const response = await loginUser(body.email, body.password);
    if (response) {
      res.status(200).json({ token: response, message: "successful" });
    }
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
}
