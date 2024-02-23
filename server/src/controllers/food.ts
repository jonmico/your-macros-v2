import { Request, Response, NextFunction } from 'express';
import Food from '../models/food';
import { Food as FoodType } from '../types/food';
import User from '../models/user';
import { AppError } from '../app-error';

export async function createFood(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { food, userId }: { food: FoodType; userId: string } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError(400, 'User does not exist.');
    }

    const newFood = await Food.create({ ...food, author: user._id });
    res.json({ food: newFood });
  } catch (err) {
    next(err);
  }
}
