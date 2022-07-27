import bodyParser from 'body-parser';
import express from 'express';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middleware/auth.middleware';

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/profile', new AuthMiddleware().verifyToken, new UserController().getUserDetails);

router.put('/profile', new AuthMiddleware().verifyToken, new UserController().updateUserDetails);

export default router;
