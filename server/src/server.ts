import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDb } from './db';
import { AppError } from './app-error';
import { router as userRouter } from './routes/user';
import { router as foodRouter } from './routes/food';
import { router as logRouter } from './routes/food-log';

connectDb();

const PORT = process.env.PORT;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser(COOKIE_SECRET));

app.use('/api/user', userRouter);
app.use('/api/food', foodRouter);
app.use('/api/food-log', logRouter);

// 404 Error handler
app.use((req, res) => {
  res
    .status(404)
    .json({ message: 'Sorry, but we cannot find what you are looking for!' });
});

// Catch-all error handler
app.use(((
  err: AppError | Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // const errorMessage = err instanceof AppError ? err.errorMessage : err.message;
  const errorMessage = err.message;
  const errorCode = err instanceof AppError ? err.errorCode : 500;

  console.error(err);
  res.status(errorCode).json({ errorMessage });
}) as ErrorRequestHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
