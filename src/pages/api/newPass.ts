import { corsAllow } from "@/helper/cors";
import connect from "@/helper/db";
import { updateUser } from "@/services/user";
import type { NextApiResponse, NextApiRequest } from "next";

export default async function setNewPassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();
  await corsAllow(req, res);
  const body = req.body;

  try {
    const sent = await updateUser(body.email, body.password);
    if (sent.message == "successful") {
      return res.json({ message: "New password set" });
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
}
