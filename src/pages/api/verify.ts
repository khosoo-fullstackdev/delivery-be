import { corsAllow } from "@/helper/cors";
import connect from "@/helper/db";
import { getUsersById } from "@/services/user";
import type { NextApiResponse, NextApiRequest } from "next";

export default async function verify(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();
  await corsAllow(req, res);
  const body = req.body;
  try {
    const sent = await getUsersById(body.email, body.password);
    if (sent.message == "valid") {
      return res.status(200).json({ message: "code checked" });
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
}
