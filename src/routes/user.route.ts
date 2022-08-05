import express from 'express';
import UsersController from '../controllers/user.controller';
import AuthMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.get(
  '/me',
  new AuthMiddleware().verifyToken,
  new UsersController().getUserDetails,
);

router.put(
  '/me',
  new AuthMiddleware().verifyToken,
  new UsersController().updateUserDetails,
);

export default router;
