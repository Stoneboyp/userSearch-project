import express from "express";
import { readFile } from "fs/promises";
import path from "path";
const router = express.Router();
// @ts-ignore
const __filename = path.resolve();
const __dirname = path.dirname(__filename);
router.get("/", async (req, res) => {
    const filePath = path.join(__dirname, "./server/users.json");
    console.log(filePath);
    try {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Имитация задержки в 5 секунд
        const data = await readFile(filePath, "utf-8");
        const users = JSON.parse(data);
        const { email, number } = req.query;
        const numberRegex = /^\d{2}-\d{2}-\d{2}$/;
        const isValidNumber = numberRegex.test(number);
        if (!isValidNumber) {
            res.json({ error: "Invalid number format" });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);
        if (!isValidEmail) {
            res.json({ error: "Invalid email format" });
            return;
        }
        const formattedNumber = number.split("-").join("");
        const findUser = users.find((user) => user.email === email && user.number === formattedNumber);
        if (findUser) {
            res.json({ message: "User data valid" });
        }
        else {
            res.json({ error: "User invalid" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
export default router;
//# sourceMappingURL=validation.js.map