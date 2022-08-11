import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UnauthorizedError from '../common/errors/unauthorized.error';
import RequestContextHelper from '../common/helpers/request-context.helper';
import RequestContextModel from '../common/models/request-context.model';

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
      throw new UnauthorizedError('E0100', 'Access Token not passed.');
    }

    let decoded : jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, instance.config.ACCESS_TOKEN_SECRET) as JwtPayload;
    } catch (err : any) {
      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        throw new UnauthorizedError('E0100', err.message);
      }
      throw new Error(err);
    }

    const { userId } = decoded.accessTokenModel;

    // Adding data in async local storage
    const requestContextModel : RequestContextModel = RequestContextHelper.getContext();
    requestContextModel.userId = userId;
    RequestContextHelper.setContext(requestContextModel, () => next());

    return next;
  }
}
