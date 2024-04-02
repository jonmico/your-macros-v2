import { Router } from 'express';
import {
  addMealToLog,
  createLog,
  deleteMealFromLog,
  getLogs,
} from '../controllers/food-log';

export const router = Router();

router.post('/create', createLog);
router.put('/add-meal', addMealToLog);
router.get('/:userId', getLogs);
router.delete('/delete', deleteMealFromLog);
