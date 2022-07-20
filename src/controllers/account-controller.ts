/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import AccountService from '../services/account.services';
import AccessTokenResponsePayload from './payloads/access-token-response.payload';
import ValidateHelper from '../common/helpers/validate.helper';

export default class AccountController {
  public async signupUser(req: Request, res: Response) {
    interface IRequestBody {
      name: string;
      email: string;
      password: string;
    }
    const requestBody: IRequestBody = req.body;
    const validateHelper: ValidateHelper = new ValidateHelper();
    const { error } = await validateHelper.signupValidate().validateAsync(req.body);
    if (error) {
      return res.status(400).send({
        error: error.details[0].message,
      });
    }
    const accessToken: string =
        await new AccountService().signupUser(
          requestBody.name,
          requestBody.email,
          requestBody.password,
        );
    const payload: AccessTokenResponsePayload = new AccessTokenResponsePayload();
    payload.accessToken = accessToken;
    if (payload.accessToken === '') {
      res.status(400).send('User with this email already exists.');
    } else { res.send(payload); }
  }

  public async loginUser(req: Request, res: Response) {
    interface IRequestBody {
      email: string;
      password: string;
    }
    const requestBody: IRequestBody = req.body;
    const validateHelper: ValidateHelper = new ValidateHelper();
    const { error } = await validateHelper.signupValidate().validateAsync(req.body);
    if (error) {
      return res.status(400).send({
        error: error.details[0].message,
      });
    }
    const accessToken: string =
        await new AccountService().loginUser(
          requestBody.email,
          requestBody.password,
        );
    const payload: AccessTokenResponsePayload = new AccessTokenResponsePayload();
    payload.accessToken = accessToken;
    if (payload.accessToken === '') {
      res.status(400).send('Given email or password is incorrect.');
    } else { res.send(payload); }
  }
}
