/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import AccountService from '../services/account.services';
import AccessTokenResponsePayload from './payloads/access-token-response.payload';
import SignupRequestPayload from './payloads/signup-request.payload';

export default class AccountController {
  public async signupUser(req: Request, res: Response) {
    const signupRequestPayload: SignupRequestPayload =
    new SignupRequestPayload(req.body.name, req.body.email, req.body.password);
    const { error } = await signupRequestPayload.validate().validateAsync(req.body);
    if (error) {
      return res.status(400).send({
        error: error.details[0].message,
      });
    }
    const accessToken: string =
        await new AccountService().signupUser(
          signupRequestPayload.name,
          signupRequestPayload.email,
          signupRequestPayload.password,
        );
    const payload: AccessTokenResponsePayload = new AccessTokenResponsePayload();
    payload.accessToken = accessToken;
    if (payload.accessToken === '') {
      res.status(400).send('User with this email already exists.');
    } else { res.send(payload); }
  }

  public async loginUser(req: Request, res: Response) {
    const accessToken: string =
        await new AccountService().loginUser(
          req.body.email,
          req.body.password,
        );
    const payload: AccessTokenResponsePayload = new AccessTokenResponsePayload();
    payload.accessToken = accessToken;
    if (payload.accessToken === '') {
      res.status(400).send('Given email or password is incorrect.');
    } else { res.send(payload); }
  }
}
