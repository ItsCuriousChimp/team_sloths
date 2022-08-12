import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import RequestContextHelper from '../common/helpers/request-context.helper';
import RequestContextModel from '../common/models/request-context.model';
import UnauthorisedError from '../common/errors/custom-errors/unauthorised.error';

let instance : any;

export default class AuthMiddleware {
  config : object;

  constructor() {
    this.config = process.env;
    instance = this;
  }

  public verifyToken = async (req : Request, res: Response, next : any) => {
    const token : string = String(req.headers['access-token']);

    if (!token) {
      throw new UnauthorisedError('No token provided');
    }

    let decoded : jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, instance.config.ACCESS_TOKEN_SECRET) as JwtPayload;
    } catch (err : any) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorisedError('Invalid Token');
      }
      if (err.name === 'TokenExpiredError') {
        throw (new UnauthorisedError('Token Expired'));
      }
      throw (err);
    }
    const { userId } = decoded.accessTokenModel;

    // Adding data in async local storage
    const requestContextModel : RequestContextModel = RequestContextHelper.getContext();
    requestContextModel.userId = userId;
    RequestContextHelper.setContext(requestContextModel, () => next());
  };
}
