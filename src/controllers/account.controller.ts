import { Request, Response } from 'express';
import AccountService from '../services/account.service';
import AccessTokenResponsePayload from './payloads/access-token-response.payload';
import SignupRequestPayload from './payloads/request/signup-request.payload';
import LoginRequestPayload from './payloads/request/login-request.payload';

export default class AccountController {
  public async signUpUserUsingEmailAndPassword(req : Request, res : Response) {
    const { name, email, password } = req.body;
    const signupRequestPayload:any =
    await new SignupRequestPayload().validateAndExtract(name, email, password);
    if (signupRequestPayload) {
      res.status(400).send(signupRequestPayload);
      return;
    }
    const accountServiceInstance : AccountService = new AccountService();
    const accessToken : String =
    await accountServiceInstance.signUpUserUsingEmailAndPassword(name, email, password);

    if (accessToken === '') {
      res.status(400).send('User with this email already exists.');
    } else {
      const payload : AccessTokenResponsePayload = new AccessTokenResponsePayload();
      payload.accessToken = accessToken;
      res.send(payload);
    }
  }

  public async loginUsingEmailAndPassword(req: Request, res: Response) {
    const { email, password } = req.body;
    const loginRequestPayload: any =
    await new LoginRequestPayload().validateAndExtract(email, password);
    if (loginRequestPayload) {
      res.status(400).send(loginRequestPayload);
      return;
    }

    const accountServiceInstance : AccountService = new AccountService();
    const accessToken : String =
    await accountServiceInstance.loginUserUsingEmailAndPassword(email, password);
    if (accessToken === '') {
      res.status(400).send('Email address or password incorrect');
    } else {
      const payload : AccessTokenResponsePayload = new AccessTokenResponsePayload();
      payload.accessToken = accessToken;
      res.send(payload);
    }
  }
}
