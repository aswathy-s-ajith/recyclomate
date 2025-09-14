import express from 'express';
import { register, login, getUserProfile, getAllDrivers } from '../controllers/userController.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, getUserProfile);
router.get('/drivers', verifyToken, isAdmin, getAllDrivers);

export default router;