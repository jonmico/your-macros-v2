import { Router } from 'express';
import { createUser, login } from '../controllers/user';

export const router = Router();

router.post('/create', createUser);
router.post('/login', login);
