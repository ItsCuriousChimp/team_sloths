import { Request, Response } from 'express';
import AccountService from '../services/account.service';
import AccessTokenResponsePayload from './payloads/access-token-response.payload';

export default class AccountController {
  public async signupUserUsingEmailAndPassword(req : Request, res : Response) {
    const nameUrl : String = req.body.name;
    const emailUrl : String = req.body.email;
    const passwordUrl : String = req.body.password;

    const accountServiceInstance : AccountService = new AccountService();
    const accessToken : String =
    await accountServiceInstance.signUpUserUsingEmailAndPassword(nameUrl, emailUrl, passwordUrl);

    if (accessToken === '') {
      res.status(400).send('User with this email already exists.');
    } else {
      const payload : AccessTokenResponsePayload = new AccessTokenResponsePayload();
      payload.accessToken = accessToken;
      res.send(payload);
    }
  }

  public async loginUsingEmailAndPassword(req: Request, res: Response) {
    const emailUrl : String = req.body.email;
    const passwordUrl : String = req.body.password;

    const accountServiceInstance : AccountService = new AccountService();
    const accessToken : String =
    await accountServiceInstance.loginUserUsingEmailAndPassword(emailUrl, passwordUrl);

    if (accessToken === '') {
      res.status(400).send('Email address or password incorrect');
    } else {
      const payload : AccessTokenResponsePayload = new AccessTokenResponsePayload();
      payload.accessToken = accessToken;
      res.send(payload);
    }
  }
}
