import { Request, Response } from 'express';
import RequestContextModel from '../common/models/request-context.model';
import UserModel from '../common/models/user.model';
import UserRepository from '../repositories/user.repository';

const { AsyncLocalStorage } = require('async_hooks');

const storage : Map<String, RequestContextModel> = new Map();

const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = async (req : Request, res: Response, next : any) => {
  const token = req.headers['access-token'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    const { userId } = decoded.accessTokenModel;
    const userByUserId : UserModel | null = await new UserRepository().getUserUsingUserId(userId);

    if (userByUserId === null) {
      throw new TypeError('User not found');
    }

    const requestContextModel : RequestContextModel = new RequestContextModel(userId);
    const asyncLocalStorage = new AsyncLocalStorage();

    asyncLocalStorage.run(storage, () => {
      asyncLocalStorage.getStore().set('RequestContextModel', requestContextModel);
    });
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

export = verifyToken;
