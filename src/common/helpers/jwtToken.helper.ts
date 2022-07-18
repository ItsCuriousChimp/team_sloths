import jwt from 'jsonwebtoken';

export default class JwtTokenHelper {
  public async generateToken(id: string): Promise<string> {
    const token = jwt.sign(
      {
        alg: 'HS256',
        typ: 'JWT',
      },
      JSON.stringify(id),
    );
    return token;
  }
}
