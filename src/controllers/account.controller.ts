import { Request, Response } from 'express';
import AccountService from '../services/account.service';
import AccessTokenResponsePayload from './payloads/access-token-response.payload';
import SignupRequestPayload from './payloads/request-payload/signup-request.payload';
import LoginRequestPayload from './payloads/request-payload/login-request.payload';
import BaseController from './payloads/request-payload/base.controller';

export default class AccountController extends BaseController {
  public async signUpUserUsingEmailAndPassword(req : Request, res : Response) {
    let signupRequestPayload: SignupRequestPayload;
    try {
      signupRequestPayload = super.validateAndExtract(req.body, SignupRequestPayload);
    } catch (err: any) {
      res.status(401).send(err.message);
      return;
    }
    const { name, email, password } = signupRequestPayload;

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
    let loginRequestPayload: LoginRequestPayload;
    try {
      loginRequestPayload = super.validateAndExtract(req.body, LoginRequestPayload);
    } catch (err: any) {
      res.status(400).send(err.message);
      return;
    }

    const { email } = loginRequestPayload;
    const { password } = loginRequestPayload;

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
