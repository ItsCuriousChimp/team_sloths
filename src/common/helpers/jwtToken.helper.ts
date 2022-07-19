import jwt from 'jsonwebtoken';
import AccessTokenModel from '../models/accessToken.model';

export default class JwtTokenHelper {
  public async generateToken(accessToken: AccessTokenModel): Promise<string> {
    const token :string = jwt.sign(
      { accessToken },
      '',
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
    return token;
  }
}
