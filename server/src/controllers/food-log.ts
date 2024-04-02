import { NextFunction, Request, Response } from 'express';
import { AppError } from '../app-error';
import FoodLog from '../models/food-log';
import User from '../models/user';
import mongoose from 'mongoose';
import { Meal } from '../types/meal';
import { calcMacros } from '../utils/calcMacros';

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

    return res.status(201).json({ foodLog: log });
  } catch (err) {
    next(err);
  }
}

export async function addMealToLog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      logId,
      meal,
    }: { logId: mongoose.Schema.Types.ObjectId; meal: Meal } = req.body;

    const log = await FoodLog.findById(logId).exec();

    if (!log) throw new AppError(400, 'Log does not exist.');

    log.meals.push(meal);

    const { logTotals } = calcMacros(log.meals);
    log.logTotals = logTotals;

    log.save();

    res.json({ updatedLog: log });
  } catch (err) {
    next(err);
  }
}

export async function getLogs(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;

    const logs = await FoodLog.find({ author: userId }, null, {
      sort: { createdAt: -1 },
    }).exec();

    res.json({ foodLogs: logs });
  } catch (err) {
    next(err);
  }
}

interface DeleteLogReqBody {
  userId: mongoose.Types.ObjectId;
  logId: mongoose.Types.ObjectId;
  mealId: mongoose.Types.ObjectId;
}

export async function deleteMealFromLog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, logId, mealId }: DeleteLogReqBody = req.body;

    const user = await User.findById(userId).exec();

    if (!user) {
      throw new AppError(400, 'User does not exist.');
    }

    const foodLog = await FoodLog.findById(logId).exec();

    if (!foodLog) {
      throw new AppError(400, 'Log not found.');
    }

    console.log(foodLog.author, user._id);

    if (foodLog.author.toString() !== user._id.toString()) {
      throw new AppError(403, 'You do not have permission to do that.');
    }

    foodLog.meals.pull(mealId);
    foodLog.save();

    res.json({ updatedLog: foodLog });
  } catch (err) {
    next(err);
  }
}
