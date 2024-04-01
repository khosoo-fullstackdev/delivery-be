import type { NextApiResponse, NextApiRequest } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ message: "Hello World" });
};

export default handler;
