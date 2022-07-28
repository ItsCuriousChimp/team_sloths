import { Request, Response } from 'express';
import AccountService from '../services/account.service';
import AccessTokenResponsePayload from './payloads/access-token-response.payload';
import SignupRequestPayload from './payloads/request-payload/signup-request.payload';
import LoginRequestPayload from './payloads/request-payload/login-request.payload';

export default class AccountController {
  public async signUpUserUsingEmailAndPassword(req : Request, res : Response) {
    const signupRequestPayload = new SignupRequestPayload();
    let validate: any;
    try {
      validate = signupRequestPayload.validateAndExtract(req.body, SignupRequestPayload);
    } catch (err) {
      res.status(401).send(err);
      return;
    }
    const { name, email, password } = validate;

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
    const loginRequestPayload = new LoginRequestPayload();
    let validate: any;
    try {
      validate = loginRequestPayload.validateAndExtract(req.body, LoginRequestPayload);
    } catch (err) {
      res.status(401).send(err);
      return;
    }

    const { email } = validate;
    const { password } = validate;

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
