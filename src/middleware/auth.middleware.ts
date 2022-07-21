import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import RequestContextHelper from '../common/helpers/request-context.helper';
import RequestContextModel from '../common/models/request-context.model';
import UserModel from '../common/models/user.model';
import UserService from '../services/user.service';

let instance : any;

export default class AuthMiddleware {
  config : object;

  constructor() {
    this.config = process.env;
    instance = this;
  }

  public async verifyToken(req : Request, res: Response, next : any) {
    const token : string = String(req.headers['access-token']);

    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    let decoded : jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, instance.config.ACCESS_TOKEN_SECRET) as JwtPayload;
    } catch (err : any) {
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).send('Invalid Token');
      }
      return res.status(400).send('System error.');
    }

    const { userId } = decoded.accessTokenModel;

    const userByUserId : UserModel | null = await new UserService().getUserUsingUserId(userId);

    if (userByUserId === null) {
      return res.status(401).send('Invalid Token');
    }

    const requestContextModel : RequestContextModel = new RequestContextModel(userId);

    const requestContextHelper = new RequestContextHelper();
    requestContextHelper.setData('RequestContext', requestContextModel);
    return next();
  }
}
