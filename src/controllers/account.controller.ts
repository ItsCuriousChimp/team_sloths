import { Request, Response } from 'express';
import AccountService from '../services/account.service';
import AccessTokenResponsePayload from './payloads/response-payload/access-token-response.payload';
import mapper from '../common/mapper';
import SignupRequestPayload from './payloads/request-payload/signup-request.payload';
import LoginRequestPayload from './payloads/request-payload/login-request.payload';

export default class AccountController {
  public async signUpUserUsingEmailAndPassword(req : Request, res : Response) {
    const signupRequestPayload = new SignupRequestPayload();
    const validate: any = signupRequestPayload.extractAndValidate(req.body);

    if (validate.error) {
      res.status(401).send(validate.error?.details[0].message);
      return;
    }

    const accountServiceInstance : AccountService = new AccountService();
    const accessToken : string =
    await accountServiceInstance.signUpUserUsingEmailAndPassword(
      signupRequestPayload.obj.name,
      signupRequestPayload.obj.email,
      signupRequestPayload.obj.password,
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
    const loginRequestPayload = new LoginRequestPayload();
    const validate: any = loginRequestPayload.extractAndValidate(req.body);

    if (validate.error) {
      res.status(401).send(validate.error?.details[0].message);
      return;
    }

    const accountServiceInstance : AccountService = new AccountService();
    const accessToken : string =
    await accountServiceInstance.loginUserUsingEmailAndPassword(
      loginRequestPayload.obj.email,
      loginRequestPayload.obj.password,
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
