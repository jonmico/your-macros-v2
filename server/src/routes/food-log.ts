import { Router } from 'express';
import { createLog, getLogs } from '../controllers/food-log';

export const router = Router();

router.post('/create', createLog);
router.get('/:userId', getLogs);
