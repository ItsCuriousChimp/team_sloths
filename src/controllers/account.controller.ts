import { Request, Response } from 'express';
import AccountService from '../services/account.service';
import AccessTokenResponsePayload from './payloads/accessToken-response.payload';

export default class AccountController {
  public async signupUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    const signupService = new AccountService().signupUser(name, email, password);
    const signupPayload = new AccessTokenResponsePayload();
    const signupServiceResponse = await signupService;
    signupPayload.token = signupServiceResponse;
    res.json(signupPayload);
  }

  public async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.query;
    const loginService: AccountService = new AccountService();
    const serviceResponse: string = await loginService.loginUser(String(email), String(password));
    if (serviceResponse === '401') {
      res.status(401).send('Incorrect email or password.');
    } else {
      const loginPayload: AccessTokenResponsePayload = new AccessTokenResponsePayload();
      loginPayload.token = serviceResponse;
      res.json(loginPayload);
    }
  }
}
