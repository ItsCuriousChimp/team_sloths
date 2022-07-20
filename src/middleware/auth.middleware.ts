import { Request, Response } from 'express';
import AccessTokenModel from '../common/models/accessToken.model';
import AccountModel from '../common/models/account.model';
import AccountRepository from '../repositories/account.repository';

const { AsyncLocalStorage } = require('async_hooks');
const jwt = require('jsonwebtoken');

export default class VerifyToken {
  async verifyToken(req: Request, res: Response, next: any) {
    const storage: Map<String, AccessTokenModel> = new Map();
    const token: string | string[] | undefined = req.headers['access-token'];

    if (!token) {
      return res.status(400).send('A token is required for authentication');
    }

    let userId: string = '';
    let isValid: boolean = false;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
      if (err) {
        return;
      }
      isValid = true;
      userId = decoded.accessToken.userId;
    });
    if (!isValid) {
      return res.status(400).send('Invalid Token');
    }

    const account: AccountModel | null = await new AccountRepository().getAccountById(userId);

    if (!account) {
      return res.status(400).send('User not found');
    }

    const accessTokenModel = new AccessTokenModel(userId);
    const asyncLocalStorage = new AsyncLocalStorage();
    asyncLocalStorage.run(storage, (): any => {
      asyncLocalStorage.getStore().set('AccessTokenModel', accessTokenModel);
    });
    return next();
  }
}
