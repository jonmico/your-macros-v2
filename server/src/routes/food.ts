import { Router } from 'express';
import {
  createFood,
  getCreatedFoods,
  searchFoodByText,
} from '../controllers/food';

export const router = Router();

router.post('/create', createFood);
router.get(`/search/:searchText`, searchFoodByText);
router.get('/created-foods/:userId', getCreatedFoods);
