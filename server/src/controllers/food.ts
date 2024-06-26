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

export async function getCreatedFoods(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;

    const createdFoods = await Food.find({ author: userId }).exec();

    return res.json({ createdFoods });
  } catch (err) {
    next(err);
  }
}

export async function getFood(req: Request, res: Response, next: NextFunction) {
  try {
    const { foodId } = req.params;

    const food = await Food.findById(foodId).exec();

    if (!food) {
      throw new AppError(400, 'No food found.');
    }

    res.json({ food });
  } catch (err) {
    next(err);
  }
}

export async function deleteFood(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { foodId } = req.body;

    const food = await Food.findByIdAndDelete(foodId).exec();

    if (!food) {
      throw new AppError(400, 'Food not found.');
    }

    res.json({ deleteSuccess: true });
  } catch (err) {
    next(err);
  }
}

export async function editFood(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { foodId } = req.params;
    const { editFood: food } = req.body;

    const editFood = await Food.findByIdAndUpdate(foodId, food, {
      runValidators: true,
      returnDocument: 'after',
    }).exec();

    if (!editFood) {
      throw new AppError(400, 'Food not found.');
    }

    res.json({ editFood });
  } catch (err) {
    next(err);
  }
}
