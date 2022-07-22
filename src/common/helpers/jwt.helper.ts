import AccessTokenModel from '../models/access-token.model';

const jwt = require('jsonwebtoken');

export default class JWTHelper {
  public generateJWTToken(accessTokenModel : AccessTokenModel) : String {
    return jwt.sign(
      { accessTokenModel },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN, // expires in 1 hour
      },
    );
  }
}
