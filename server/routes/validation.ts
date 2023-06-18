import { Request, Response } from "express";

import express from "express";
import { readFile } from "fs/promises";
import path from "path";

interface User {
    email: string;
    number: string;
}

type ReqQuery = User;
type ResBody = {
    error?: string;
    message?: string;
};
const router = express.Router();
// @ts-ignore
const __filename = path.resolve();
const __dirname = path.dirname(__filename);
// type req body
router.get(
    "/",
    async (req: Request<{}, ResBody, undefined, ReqQuery>, res: Response) => {
        const filePath = path.join(__dirname, "./users.json");
        try {
            await new Promise((resolve) => setTimeout(resolve, 5000)); // Имитация задержки в 5 секунд

            const data = await readFile(filePath, "utf-8");

            const users: User[] = JSON.parse(data);
            const { email, number } = req.query;

            const numberRegex = /^\d{2}-\d{2}-\d{2}$/;
            const isValidNumber = numberRegex.test(number as string);

            if (!isValidNumber) {
                res.json({ error: "Invalid number format" });
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValidEmail = emailRegex.test(email as string);

            if (!isValidEmail) {
                res.json({ error: "Invalid email format" });
                return;
            }

            const formattedNumber = (number as string).split("-").join("");

            const findUser = users.find(
                (user) =>
                    user.email === email && user.number === formattedNumber
            );

            if (findUser) {
                res.json({ message: "User data valid" });
            } else {
                res.json({ error: "User invalid" });
            }
        } catch (error) {
            console.log(error);
        }
    }
);

export default router;
