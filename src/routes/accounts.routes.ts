import express from 'express';
import AccountController from '../controllers/account.controller';

const router = express.Router();

router.post('/signup', new AccountController().signUpUserUsingEmailAndPassword);

router.get('/login', new AccountController().loginUsingEmailAndPassword);

export default router;
