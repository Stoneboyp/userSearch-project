import express from "express";
import router from './routes/validation.js';

const app = express();
const port = 3000;

app.use('/validation', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
