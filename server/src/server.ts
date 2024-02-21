import express from 'express';
import 'dotenv/config';

import { connectDb } from './db';

connectDb();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
