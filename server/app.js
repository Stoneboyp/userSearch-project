import express from 'express';

import validation from './routes/validation.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/validation', validation);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
