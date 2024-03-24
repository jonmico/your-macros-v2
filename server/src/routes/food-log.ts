import { Router } from 'express';
import { addMealToLog, createLog, getLogs } from '../controllers/food-log';

export const router = Router();

router.post('/create', createLog);
router.put('/add-meal', addMealToLog);
router.get('/:userId', getLogs);
