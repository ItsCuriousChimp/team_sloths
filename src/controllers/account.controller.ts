/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import AccountService from '../services/account.service';
import AccessTokenResponsePayload from './payloads/response-payload/access-token-response.payload';
import mapper from '../common/mapper';
import SignupRequestPayload from './payloads/request-payload/signup-request.payload';
import LoginRequestPayload from './payloads/request-payload/login-request.payload';
import BaseController from './base.controller';

export default class AccountController extends BaseController {
  public async signUpUserUsingEmailAndPassword(req : Request, res : Response) {
    let signupRequestPayload : SignupRequestPayload = new SignupRequestPayload();
    try {
      signupRequestPayload = super.extractAndValidate(req.body, SignupRequestPayload);
    } catch (err : any) {
      return res.status(400).send(err.message);
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
      const accessTokenResponsePayloadInstance =
      mapper.map(accessToken, String, AccessTokenResponsePayload);
      res.send(accessTokenResponsePayloadInstance);
    }
  }

  public async loginUsingEmailAndPassword(req: Request, res: Response) {
    let loginRequestPayload : LoginRequestPayload = new LoginRequestPayload();
    try {
      loginRequestPayload = super.extractAndValidate(req.body, LoginRequestPayload);
    } catch (err : any) {
      console.log(err);
      return res.status(400).send(err.message);
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
      const accessTokenResponsePayloadInstance =
      mapper.map(accessToken, String, AccessTokenResponsePayload);
      res.send(accessTokenResponsePayloadInstance);
    }
  }
}
