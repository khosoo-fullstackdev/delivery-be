import { loginService } from "@/services/user";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

type Data = {
  message?: string;
  token?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  console.log("in backend", req.body);
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const data = req.body;
  const { email, password } = data;

  try {
    const newToken = await loginService(email, password);
    if (newToken) {
      return res
        .status(200)
        .json({ token: newToken, message: "Login successful" });
    }
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
}
