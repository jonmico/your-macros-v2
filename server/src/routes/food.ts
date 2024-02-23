import { Router } from 'express';
import { createFood } from '../controllers/food';

export const router = Router();

router.post('/create', createFood);
