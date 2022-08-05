import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import RequestContextHelper from '../common/helpers/request-context.helper';
import RequestContextModel from '../common/models/request-context.model';
import ErrorMiddleware from './error.middleware';
import UnauthorisedError from '../common/errors/custom-errors/unauthorised.error';

let instance : any;

export default class AuthMiddleware {
  config : object;

  constructor() {
    this.config = process.env;
    instance = this;
  }

  // eslint-disable-next-line consistent-return
  public async verifyToken(req : Request, res: Response, next : any) {
    const token : string = String(req.headers['access-token']);

    if (!token) {
      const error : UnauthorisedError = new UnauthorisedError('No token provided');
      return ErrorMiddleware.handleError(error, req, res);
    }
    let decoded : jwt.JwtPayload;

    try {
      decoded = jwt.verify(token, instance.config.ACCESS_TOKEN_SECRET) as JwtPayload;
    } catch (err : any) {
      if (err.name === 'JsonWebTokenError') {
        return ErrorMiddleware.handleError(new UnauthorisedError('Invalid Token'), req, res);
      }
      if (err.name === 'TokenExpiredError') {
        return ErrorMiddleware.handleError(new UnauthorisedError('Token Expired'), req, res);
      }
      return next(err);
    }

    const { userId } = decoded.accessTokenModel;

    // Adding data in async local storage
    const requestContextModel : RequestContextModel = RequestContextHelper.getContext();
    requestContextModel.userId = userId;
    RequestContextHelper.setContext(requestContextModel, () => next());
  }
}
