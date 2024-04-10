import { corsAllow } from "@/helper/cors";
import connect from "@/helper/db";
import type { NextApiResponse, NextApiRequest } from "next";

export default async function verify(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();
  await corsAllow(req, res);
  const body = req.body;

  const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;
}
