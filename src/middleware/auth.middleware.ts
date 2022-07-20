import { Request, Response } from 'express';
import RequestContextModel from '../common/models/request-context.model';
import UserModel from '../common/models/user.model';
import UserService from '../services/user.service';

const { AsyncLocalStorage } = require('async_hooks');

const jwt = require('jsonwebtoken');

let instance : any;

export default class AuthMiddleware {
  storage : Map<String, RequestContextModel>;
  config : any;

  constructor() {
    this.storage = new Map();
    this.config = process.env;
    instance = this;
  }

  public async verifyToken(req : Request, res: Response, next : any) {
    const token = req.headers['access-token'];

    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    const decoded : any =
    jwt.verify(token, instance.config.ACCESS_TOKEN_SECRET, (err : any, decodedJWT: any) => {
      if (err) {
        return null;
      }
      return decodedJWT;
    });
    if (decoded === null) {
      return res.status(401).send('Invalid Token');
    }

    const { userId } = decoded.accessTokenModel;
    const userByUserId : UserModel | null = await new UserService().getUserUsingUserId(userId);

    if (userByUserId === null) {
      return res.status(401).send('Invalid Token');
    }

    const requestContextModel : RequestContextModel = new RequestContextModel(userId);
    const asyncLocalStorage = new AsyncLocalStorage();

    asyncLocalStorage.run(instance.storage, () => {
      asyncLocalStorage.getStore().set('RequestContext', requestContextModel);
    });
    return next();
  }
}
