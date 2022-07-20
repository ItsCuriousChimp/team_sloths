import jwt from 'jsonwebtoken';
import AccessTokenModel from '../models/accessToken.model';

export default class JwtTokenHelper {
  public async generateToken(accessToken: AccessTokenModel): Promise<string> {
    return jwt.sign(
      { accessToken },
      String(process.env.ACCESS_TOKEN_SECRET),
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
  }
}
