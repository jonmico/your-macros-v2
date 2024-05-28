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

      res.status(201).json({
        isLoggedIn: true,
        userId: newUser._id,
        token: token,
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

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      isLoggedIn: true,
      userId: user._id,
      token,
    });
  } catch (err) {
    next(err);
  }
}

interface IToken {
  id: string;
}

export async function checkUserSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.body;

    if (!token) {
      throw new AppError(401, 'Token not provided.');
    }

    const decoded = jwt.verify(token, JWT_SECRET) as IToken;

    if (decoded.id) {
      const user = await User.findById(decoded.id).exec();

      if (!user) {
        throw new AppError(400, 'User does not exist.');
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        isLoggedIn: true,
        userId: user._id,
        token,
      });
    }
  } catch (err) {
    next(err);
  }
}

export async function getUserData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;

    if (!userId) {
      throw new AppError(400, 'No userId provided.');
    }

    const user = await User.findById(userId).exec();

    if (!user) {
      throw new AppError(400, 'User not found.');
    }

    res.json({
      userData: {
        calories: user.dailyIntake.calories,
        macros: {
          fat: user.dailyIntake.macros.fat,
          carbs: user.dailyIntake.macros.carbs,
          protein: user.dailyIntake.macros.protein,
        },
        createdFoods: user.createdFoods,
        isInitialized: user.isInitialized,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function updateMacros(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, calories, macros } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        dailyIntake: { calories: calories, macros: macros },
        isInitialized: true,
      },
      { returnDocument: 'after', runValidators: true }
    ).exec();

    if (!user) {
      throw new AppError(400, 'User does not exist.');
    }

    res.json({
      userData: {
        calories: user.dailyIntake.calories,
        macros: user.dailyIntake.macros,
        isInitialized: user.isInitialized,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const { token } = req.signedCookies;

    if (newPassword !== confirmNewPassword) {
      throw new AppError(400, 'Passwords do not match.');
    }

    const payload = jwt.verify(token, JWT_SECRET) as IToken;

    const user = await User.findById(payload.id).exec();

    if (!user) {
      throw new AppError(400, 'User does not exist.');
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      throw new AppError(400, 'Current password incorrect.');
    }

    bcrypt.hash(newPassword, 10, async (err, hash) => {
      user.password = hash;
      await user.save();

      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        'expiresIn': '7d',
      });

      res.json({ updatedPassword: true, token: token });
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.signedCookies;

    const payload = jwt.verify(token, JWT_SECRET) as IToken;

    await User.findByIdAndDelete(payload.id).exec();

    res.json({ successfulDelete: true });
  } catch (err) {
    next(err);
  }
}
