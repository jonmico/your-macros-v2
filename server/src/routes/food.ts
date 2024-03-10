import { Router } from 'express';
import { createFood, searchFoodByText } from '../controllers/food';

export const router = Router();

router.post('/create', createFood);
router.get(`/search/:searchText`, searchFoodByText);
