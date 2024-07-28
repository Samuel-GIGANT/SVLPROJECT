import { Router } from 'express';
import { registerUser, loginUser } from '../Controllers/authController.js';

const router = Router();

router.post('/', loginUser);

export default router;


