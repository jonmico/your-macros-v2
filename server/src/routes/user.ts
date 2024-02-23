import { Router } from 'express';
import { createUser } from '../controllers/user';

export const router = Router();

router.post('/create', createUser);
