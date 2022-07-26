import express from 'express';
import AccountController from '../controllers/account.controller';

const router = express.Router();

const accoutnController = new AccountController();

router.post('/signup', accoutnController.signUpUserUsingEmailAndPassword);
router.get('/login', accoutnController.loginUsingEmailAndPassword);

export default router;
