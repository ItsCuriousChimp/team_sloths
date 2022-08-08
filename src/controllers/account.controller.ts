/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import AccountService from '../services/account.service';
import AccessTokenResponsePayload from './payloads/response-payload/access-token-response.payload';
import mapper from '../common/mapper';
import SignupRequestPayload from './payloads/request-payload/signup-request.payload';
import LoginRequestPayload from './payloads/request-payload/login-request.payload';
import BaseController from './base.controller';

export default class AccountController extends BaseController {
  public async signUpUserUsingEmailAndPassword(req : Request, res : Response, next : NextFunction) {
    let signupRequestPayload : SignupRequestPayload = new SignupRequestPayload();
    try {
      signupRequestPayload = super.extractAndValidate(req.body, SignupRequestPayload);
    } catch (err : any) {
      return next(err);
    }

    const accountServiceInstance : AccountService = new AccountService();
    let accessToken : string;
    try {
      accessToken = await accountServiceInstance.signUpUserUsingEmailAndPassword(
        signupRequestPayload.name,
        signupRequestPayload.email,
        signupRequestPayload.password,
      );
    } catch (err) {
      return next(err);
    }
    const accessTokenResponsePayloadInstance =
    mapper.map(accessToken, String, AccessTokenResponsePayload);
    res.send(accessTokenResponsePayloadInstance);
  }

  public async loginUsingEmailAndPassword(req : Request, res : Response, next : NextFunction) {
    let loginRequestPayload : LoginRequestPayload = new LoginRequestPayload();
    try {
      loginRequestPayload = super.extractAndValidate(req.body, LoginRequestPayload);
    } catch (err : any) {
      return next(err);
    }

    const accountServiceInstance : AccountService = new AccountService();
    let accessToken : string;
    try {
      accessToken = await accountServiceInstance.loginUserUsingEmailAndPassword(
        loginRequestPayload.email,
        loginRequestPayload.password,
      );
    } catch (err) {
      return next(err);
    }
    const accessTokenResponsePayloadInstance =
    mapper.map(accessToken, String, AccessTokenResponsePayload);
    res.send(accessTokenResponsePayloadInstance);
  }
}
