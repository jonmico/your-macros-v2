import { Router } from 'express';
import {
  createFood,
  deleteFood,
  getCreatedFoods,
  getFood,
  searchFoodByText,
} from '../controllers/food';

export const router = Router();

router.post('/create', createFood);
router.get(`/search/:searchText`, searchFoodByText);
router.get('/created-foods/:userId', getCreatedFoods);
router.get('/:foodId', getFood);
router.delete('/', deleteFood);
