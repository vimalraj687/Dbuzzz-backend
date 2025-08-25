import { Router } from 'express';
import { login, me, register, logout } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddlewares.js';


const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, me);
router.post('/logout', protect, logout);


export default router;