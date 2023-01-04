import { NextApiRequest, NextApiResponse } from "next";
import { compare, genSalt, hash } from "bcryptjs";

import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, password, passwordc } = req.body;

        // if (!email || !password) {
        //     return res.status(400).json({ error: "Missing email or password" });
        // }

        const userExists = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        if (userExists) {
            return res.status(400).json({ error: "Kullanıcı zaten mevcut" });
        }

        if (!email.includes("@" && ".")) {
            return res.status(400).json({ error: "E-mail geçersiz" });
        }

        if (!email || !password || !passwordc) {
            return res.status(400).json({ error: "E-mail yada parola boş geçilemez" });
        }
        if (password.length < 6 || passwordc.length < 6) {
            return res.status(400).json({ error: "Parolanız en az 6 karakter olmalı" });
        }else if(password !== passwordc){
            return res.status(400).json({ error: "Şifreler aynı değil" });
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }

}