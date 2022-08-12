/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import AccountService from '../services/account.service';
import AccessTokenResponsePayload from './payloads/response-payload/access-token-response.payload';
import mapper from '../common/mapper';
import SignupRequestPayload from './payloads/request-payload/signup-request.payload';
import LoginRequestPayload from './payloads/request-payload/login-request.payload';
import BaseController from './base.controller';

export default class AccountController extends BaseController {
  public async signUpUserUsingEmailAndPassword(req : Request, res : Response)
   : Promise<void> {
    let signupRequestPayload: SignupRequestPayload = new SignupRequestPayload();
    signupRequestPayload = super.extractAndValidate(req.body, SignupRequestPayload);

    const accountServiceInstance : AccountService = new AccountService();
    const accessToken : string =
    await accountServiceInstance.signUpUserUsingEmailAndPassword(
      signupRequestPayload.name,
      signupRequestPayload.email,
      signupRequestPayload.password,
    );
    const accessTokenResponsePayloadInstance =
      mapper.map(accessToken, String, AccessTokenResponsePayload);
    res.send(accessTokenResponsePayloadInstance);
  }

  public async loginUsingEmailAndPassword(req: Request, res: Response) {
    let loginRequestPayload : LoginRequestPayload = new LoginRequestPayload();
    loginRequestPayload = super.extractAndValidate(req.body, LoginRequestPayload);

    const accountServiceInstance : AccountService = new AccountService();
    const accessToken : string =
    await accountServiceInstance.loginUserUsingEmailAndPassword(
      loginRequestPayload.email,
      loginRequestPayload.password,
    );
    const accessTokenResponsePayloadInstance =
      mapper.map(accessToken, String, AccessTokenResponsePayload);
    res.send(accessTokenResponsePayloadInstance);
  }
}
