import bcrypt from 'bcrypt';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../app-error';
import User from '../models/user';
import { User as UserType } from '../types/user';
import { calcCalories } from '../utils/calcCalories';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user }: { user: UserType } = req.body;

  try {
    if (!user) {
      throw new AppError(400, 'No user provided.');
    }

    const existingUser = await User.findOne({ email: user.email }).exec();

    if (existingUser) {
      throw new AppError(400, 'User with that email already exists.');
    }

    let calories = 0;

    if (user.dailyIntake) {
      calories = calcCalories(user.dailyIntake.macros);
    }

    bcrypt.hash(user.password, 10, async (err, hash) => {
      const newUser = await User.create({
        ...user,
        password: hash,
        calories: calories,
      });

      const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
        expiresIn: '1h',
      });

      res
        .status(201)
        .cookie('token', token, { maxAge: 60 * 60, signed: true })
        .json({
          isLoggedIn: true,
          userData: {
            userId: newUser._id,
            calories: newUser.dailyIntake.calories,
            macros: newUser.dailyIntake.macros,
            createdFoods: newUser.createdFoods,
            foodLogs: newUser.foodLogs,
            weightLog: newUser.weightLogs,
            weight: newUser.weight,
          },
        });
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      throw new AppError(400, 'User does not exist.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(400, 'Email or password is incorrect.');
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res
      .cookie('token', token, {
        signed: true,
        maxAge: Date.now() + 1000 * 60 * 60 * 24 * 7,
      })
      .json({
        isLoggedIn: true,
        userData: {
          userId: user._id,
          calories: user.dailyIntake.calories,
          macros: user.dailyIntake.macros,
          createdFoods: user.createdFoods,
          foodLogs: user.foodLogs,
          weightLog: user.weightLogs,
          weight: user.weight,
        },
      });
  } catch (err) {
    next(err);
  }
}

export async function checkUserSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.signedCookies.token;
    if (!token) {
      throw new AppError(401, 'Token not provided.');
    }

    jwt.verify(token, JWT_SECRET, async (err: any, decode: any) => {
      if (err) {
        throw new AppError(400, err);
      }

      const user = await User.findById(decode.id).exec();

      if (!user) {
        throw new AppError(400, 'User does not exist.');
      }

      res.json({
        isLoggedIn: true,
        userData: {
          userId: user._id,
          calories: user.dailyIntake.calories,
          macros: user.dailyIntake.macros,
          createdFoods: user.createdFoods,
          foodLogs: user.foodLogs,
          weightLog: user.weightLogs,
          weight: user.weight,
        },
      });
    });
  } catch (err) {
    next(err);
  }
}
