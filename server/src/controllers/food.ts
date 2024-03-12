import { NextFunction, Request, Response } from 'express';
import { AppError } from '../app-error';
import Food from '../models/food';
import User from '../models/user';
import { Food as FoodType } from '../types/food';
import { calcCalories } from '../utils/calcCalories';

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

    const calories = calcCalories(food.macros);

    const newFood = await Food.create({
      ...food,
      calories: calories,
      author: user._id,
    });

    user.createdFoods.push(newFood._id);
    await user.save();

    res.json({ food: newFood });
  } catch (err) {
    next(err);
  }
}

export async function searchFoodByText(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { searchText } = req.params;

    if (!searchText) {
      throw new AppError(400, 'No search text provided.');
    }

    const searchedFoods = await Food.find({
      $text: { $search: searchText },
    }).exec();

    if (!searchedFoods.length || !searchedFoods) {
      throw new AppError(400, 'No foods found.');
    }

    res.json({ searchedFoods });
  } catch (err) {
    next(err);
  }
}
