import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import RequestContextHelper from '../helpers/request-context.helper';
import RequestContextModel from '../models/request-context.model';

export default class AuthMiddleware {
  public async verifyToken(req : Request, res: Response, next : any) {
    const token : string = String(req.headers['access-token']);

    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    let decoded : jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET)) as JwtPayload;
    } catch (err : any) {
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).send('Invalid Token');
      }
      throw err;
    }

    const { userId } = decoded.accessTokenModel;

    const requestContextModel : RequestContextModel = new RequestContextModel();
    requestContextModel.userId = userId;
    const requestContextHelper = new RequestContextHelper();
    requestContextHelper.setData(requestContextModel, () => next());
    return next;
  }
}
