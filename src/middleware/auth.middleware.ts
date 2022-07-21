import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import RequestContextModel from '../common/models/requestContext.model';
import RequestContextHelper from '../common/helpers/requestContext.helper';

export default class AuthMiddleware {
  verifyToken(req: Request, res: Response, next: any) {
    const token: String | undefined = req.header('access-token');
    const secret = String(process.env.ACCESS_TOKEN_SECRET);

    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    let response: jwt.JwtPayload;
    try {
      response = jwt.verify(String(token), secret) as jwt.JwtPayload;
    } catch (err: any) {
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).send('Unauthorized');
      }
      return res.status(401).send('System Error');
    }

    const { userId } = response.accessToken;
    if (!userId) {
      return res.status(401).send('Unauthorized');
    }

    const requestContextModel: RequestContextModel = new RequestContextModel(userId);
    const requestContextHelper = new RequestContextHelper();
    requestContextHelper.setItem('RequestContext', requestContextModel);

    return next();
  }
}
