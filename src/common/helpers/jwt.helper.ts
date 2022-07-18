import AccessTokenModel from '../models/access-token.model';

const jwt = require('jsonwebtoken');

export default class JWTHelper {
  public generateJWTToken(accessTokenModel : AccessTokenModel) : String {
    return jwt.sign(JSON.stringify(accessTokenModel), process.env.ACCESS_TOKEN_SECRET);
  }
}
