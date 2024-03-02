import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { User as UserType } from '../types/user';
import { AppError } from '../app-error';
import { calcCalories } from '../utils/calcCalories';

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

      res.json({
        user: {
          id: newUser._id,
          email: newUser.email,
          weight: newUser.weight,
          weightLogs: newUser.weightLogs,
          dailyIntake: newUser.dailyIntake,
        },
      });
    });
  } catch (err) {
    next(err);
  }
}
