import { Router } from 'express';
import {
  checkUserSession,
  createUser,
  login,
  getUserData,
} from '../controllers/user';

export const router = Router();

router.post('/create', createUser);
router.post('/login', login);
router.get('/:userId', getUserData);
router.get('/', checkUserSession);
