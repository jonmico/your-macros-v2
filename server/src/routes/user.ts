import { Router } from 'express';
import {
  checkUserSession,
  createUser,
  login,
  getUserData,
  updateMacros,
} from '../controllers/user';

export const router = Router();

router.post('/create', createUser);
router.post('/login', login);
router.get('/:userId', getUserData);
router.get('/', checkUserSession);
router.patch('/update-macros', updateMacros);
