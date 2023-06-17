import express from 'express';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let currentRequest = null;

router.get('/', async (req, res) => {
  if (currentRequest) {
    currentRequest.abort();
  }

  const filePath = path.join(__dirname, '../users.json');

  const controller = new AbortController();
  const { signal } = controller;

  currentRequest = controller;

  try {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Имитация задержки в 5 секунд

    const data = await readFile(filePath, 'utf-8', { signal });

    if (signal.aborted) {
      res.json({ message: 'Cancelled previous request, still hello from backend' });
      return;
    }

    const users = JSON.parse(data);
    const { email, number } = req.query;

    const numberRegex = /^\d{2}-\d{2}-\d{2}$/;
    const isValidNumber = numberRegex.test(number);

    if (!isValidNumber) {
      res.json({ error: 'Invalid number format' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      res.json({ error: 'Invalid email format' });
      return;
    }

    const formattedNumber = number.split('-').join('');

    const findUsers = users.find(
      (user) => user.email === email && user.number === formattedNumber
    );

    if (findUsers) {
      res.json({ message: 'User data valid' });
    } else {
      res.json({ error: 'User invalid' });
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      res.json({ message: 'Cancelled previous request, still hello from backend' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } finally {
    currentRequest = null;
  }
});

export default router;
