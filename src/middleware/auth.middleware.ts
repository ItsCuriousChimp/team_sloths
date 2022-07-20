import { Request, Response } from 'express';
import RequestContextModel from '../common/models/requestContext.model';
import AccountModel from '../common/models/account.model';
import AccountRepository from '../repositories/account.repository';

const { AsyncLocalStorage } = require('async_hooks');
const jwt = require('jsonwebtoken');

export default class AuthMiddleware {
  async verifyToken(req: Request, res: Response, next: any) {
    const storage: Map<String, RequestContextModel> = new Map();
    const token: string | string[] | undefined = req.headers['access-token'];

    if (!token) {
      return res.status(401).send('Unauthorized');
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
      return res.status(401).send('Unauthorized');
    }

    const account: AccountModel | null = await new AccountRepository().getAccountById(userId);

    if (!account) {
      return res.status(401).send('Unauthorized');
    }

    const requestContextModel: RequestContextModel = new RequestContextModel(userId);
    const asyncLocalStorage = new AsyncLocalStorage();
    asyncLocalStorage.run(storage, (): any => {
      asyncLocalStorage.getStore().set('RequestContext', requestContextModel);
    });
    return next();
  }
}
