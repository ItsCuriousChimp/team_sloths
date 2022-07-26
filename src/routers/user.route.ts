import express from 'express';
import AuthMiddleware from '../middleware/auth.middleware';

import UserController from '../controllers/user.controller';

const router = express.Router();

const userController = new UserController();

router.get('/profile', new AuthMiddleware().verifyToken, userController.getUserDetails);
router.put('/profile', new AuthMiddleware().verifyToken, userController.updateUserDetails);

export default router;
