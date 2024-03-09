import { NextFunction, Request, Response } from 'express';
import { AppError } from '../app-error';
import FoodLog from '../models/food-log';
import User from '../models/user';

export async function createLog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, name }: { userId: string; name: string } = req.body;

    const user = await User.findById(userId).exec();

    if (!user) {
      throw new AppError(400, 'User does not exist.');
    }

    const log = await FoodLog.create({ author: user._id, name });

    user.foodLogs.push(log._id);
    user.save();

    return res.status(201).json({ log });
  } catch (err) {
    next(err);
  }
}

export async function getLogs(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;

    const logs = await FoodLog.find({ author: userId }).exec();

    res.json({ foodLogs: logs });
  } catch (err) {
    next(err);
  }
}
