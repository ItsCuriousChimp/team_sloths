/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import AccountService from '../services/account.service';
import AccessTokenResponsePayload from './payloads/response-payload/access-token-response.payload';
import mapper from '../common/mapper';
import SignupRequestPayload from './payloads/request-payload/signup-request.payload';
import LoginRequestPayload from './payloads/request-payload/login-request.payload';
import BaseController from './base.controller';
import ArgumentValidationError from '../common/errors/custom-errors/argument.validation.error';
import UnauthorisedError from '../common/errors/custom-errors/unauthorised.error';
import UnprocessableEntityError from '../common/errors/custom-errors/unprocessable.entity.error';

export default class AccountController extends BaseController {
  public async signUpUserUsingEmailAndPassword(req : Request, res : Response, next : any)
   : Promise<void> {
    let signupRequestPayload : SignupRequestPayload = new SignupRequestPayload();

    try {
      signupRequestPayload = super.extractAndValidate(req.body, SignupRequestPayload);
    } catch (errr:any) {
      // const err = new BaseError('SignupRequestPayload', errr.message, errr);
      // return res.status(400).send(err.message);
      return next(new ArgumentValidationError(errr.message));
    }

    const accountServiceInstance : AccountService = new AccountService();
    const accessToken : string =
    await accountServiceInstance.signUpUserUsingEmailAndPassword(
      signupRequestPayload.name,
      signupRequestPayload.email,
      signupRequestPayload.password,
    );

    if (accessToken === '') {
      return next(new UnprocessableEntityError('User with this email already exists.'));
    }
    const accessTokenResponsePayloadInstance =
      mapper.map(accessToken, String, AccessTokenResponsePayload);
    res.send(accessTokenResponsePayloadInstance);
  }

  public async loginUsingEmailAndPassword(req: Request, res: Response, next: any) {
    let loginRequestPayload : LoginRequestPayload = new LoginRequestPayload();
    try {
      loginRequestPayload = super.extractAndValidate(req.body, LoginRequestPayload);
    } catch (err : any) {
      return next(new ArgumentValidationError(err.message));
    }

    const accountServiceInstance : AccountService = new AccountService();
    const accessToken : string =
    await accountServiceInstance.loginUserUsingEmailAndPassword(
      loginRequestPayload.email,
      loginRequestPayload.password,
    );
    if (accessToken === '') {
      return next(new UnauthorisedError('Invalid email or password'));
    }
    const accessTokenResponsePayloadInstance =
      mapper.map(accessToken, String, AccessTokenResponsePayload);
    res.send(accessTokenResponsePayloadInstance);
  }
}
