import { Router } from 'express';
import { createLog } from '../controllers/food-log';

export const router = Router();

router.post('/create', createLog);
