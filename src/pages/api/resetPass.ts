import { corsAllow } from "@/helper/cors";
import connect from "@/helper/db";
import type { NextApiResponse, NextApiRequest } from "next";
import { getUser, updateUser } from "@/services/user";
const nodemailer = require("nodemailer");
import { nanoid } from "nanoid";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.PERSONAL_EMAIL,
    pass: process.env.PERSONAL_PASS,
  },
});

export default async function reset(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  await corsAllow(req, res);
  const body = req.body;
  console.log(body);
  const code = nanoid(6);

  try {
    const user = await getUser(body.email);
    if (user.message == "user found") {
      const sent = await updateUser(body.email, code);
      const mail = await transporter.sendMail({
        from: "DeliveryFoodProject",
        to: process.env.PERSONAL_EMAIL,
        replyTo: body.email,
        subject: `Reset Password`,
        html: `
            <p> Name: from delivery </p>
            <p> Reset code: ${code} </p>
            
            `,
      });

      return res.json({ message: "Success: email was sent" });
    } else {
      res.status(500).json({ message: "COULD NOT SEND MESSAGE" });
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
}
