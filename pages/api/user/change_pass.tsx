import type { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcryptjs";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const userEmail = session.user.email;
  const userData = req.body.data;
  console.log("user datası burda", userData);

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    }
  });
  // console.log("USERR",user)

  const passControl = userData.password === userData.passwordc;
  if (!passControl) {
    res.status(400).json({ error: "Şifreler eşleşmiyor" });
    return;
  }

  const validPassword = await bcrypt.compare(userData.oldPassword, user.password);
  if (!validPassword) {
    res.status(400).json({ error: "Eski şifreniz yanlış" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const userUpdate = await prisma.user.update({
    where: {
      email: userEmail,
    },
    data: {
      password: hashedPassword,
    },
  });
  res.status(200).json({ userUpdate });
}
