import express from 'express';
import { readFile } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const router = express.Router();

// Получаем путь к текущему файлу
const __filename = fileURLToPath(import.meta.url);
// Извлекаем директорию из пути
const __dirname = path.dirname(__filename);

let currentRequest = null; // Переменная для отслеживания текущего запроса

router.get("/", (req, res) => {
  if (currentRequest) {
    // Если уже есть текущий запрос, отменяем его
    currentRequest.cancel();
  }

  const filePath = path.join(__dirname, '../users.json');

  const requestPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        try {
          const users = JSON.parse(data);
          const { email, number } = req.query;

          const numberRegex = /^\d{2}-\d{2}-\d{2}$/;
          const isValidNumber = numberRegex.test(number);

          if (!isValidNumber) {
            resolve({ error: "Invalid number format" });
            return;
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const isValidEmail = emailRegex.test(email);

          if (!isValidEmail) {
            resolve({ error: "Invalid email format" });
            return;
          }

          const formattedNumber = number.split("-").join("");

          const findUsers = users.find(
            (user) => user.email === email && user.number === formattedNumber
          );

          if (findUsers) {
            resolve({ message: "User data valid" });
          } else {
            resolve({ error: "User invalid" });
          }
        } catch (error) {
          reject(error);
        }
      });
    }, 5000); // Задержка в 5 секунд
  });

  currentRequest = requestPromise; // Устанавливаем текущий запрос

  requestPromise
    .then((data) => {
      currentRequest = null; // Сбрасываем текущий запрос после его завершения
      res.json(data);
    })
    .catch((error) => {
      currentRequest = null; // Сбрасываем текущий запрос после его завершения
      res.status(500).json({ error: "Internal Server Error" });
    });
});

export default router;
