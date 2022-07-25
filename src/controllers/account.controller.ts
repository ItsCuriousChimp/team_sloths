/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import AccountService from '../services/account.service';
import AccessTokenResponsePayload from './payloads/response-payload/access-token-response.payload';
import SignupRequestPayload from './payloads/request-payload/signup-request.payload';
import LoginRequestPayload from './payloads/request-payload/login-request.payload';

export default class AccountController {
  public async signUpUserUsingEmailAndPassword(req : Request, res : Response) {
    const signupRequestPayload: SignupRequestPayload =
    new SignupRequestPayload(req.body.name, req.body.email, req.body.password);

    try {
      await signupRequestPayload.validate().validateAsync(req.body);
    } catch (err : any) {
      return res.status(400).send({ error: err.details[0].message });
    }

    const accountServiceInstance : AccountService = new AccountService();
    const accessToken : string =
    await accountServiceInstance.signUpUserUsingEmailAndPassword(
      signupRequestPayload.name,
      signupRequestPayload.email,
      signupRequestPayload.password,
    );

    if (accessToken === '') {
      res.status(400).send('User with this email already exists.');
    } else {
      const payload : AccessTokenResponsePayload = new AccessTokenResponsePayload();
      payload.accessToken = accessToken;
      res.send(payload);
    }
  }

  public async loginUsingEmailAndPassword(req: Request, res: Response) {
    const loginRequestPayload : LoginRequestPayload =
    new LoginRequestPayload(req.body.email, req.body.password);

    try {
      await loginRequestPayload.validate().validateAsync(req.body);
    } catch (err : any) {
      return res.status(400).send({ error: err.details[0].message });
    }

    const accountServiceInstance : AccountService = new AccountService();
    const accessToken : string =
    await accountServiceInstance.loginUserUsingEmailAndPassword(
      loginRequestPayload.email,
      loginRequestPayload.password,
    );
    if (accessToken === '') {
      res.status(400).send('Email address or password incorrect');
    } else {
      const payload : AccessTokenResponsePayload = new AccessTokenResponsePayload();
      payload.accessToken = accessToken;
      res.send(payload);
    }
  }
}
