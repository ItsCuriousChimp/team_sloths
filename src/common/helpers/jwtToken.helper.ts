import jwt from 'jsonwebtoken';
import AccessTokenModel from '../models/accessToken.model';

export default class JwtTokenHelper {
  public async generateToken(accessToken: AccessTokenModel): Promise<string> {
    const token = jwt.sign(
      {
        alg: 'HS256',
        typ: 'JWT',
      },
      JSON.stringify(accessToken),
    );
    return token;
  }
}
