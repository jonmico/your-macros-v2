import { Router } from 'express';
import { checkUserSession, createUser, login } from '../controllers/user';

export const router = Router();

router.post('/create', createUser);
router.post('/login', login);
router.get('/', checkUserSession);
