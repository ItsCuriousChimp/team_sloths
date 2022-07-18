import { Request, Response } from 'express';
import AccountService from '../services/account.service';
import SignupResponsePayload from './payloads/signup-response.payload';

export default class AccountController {
  public async signUpUserUsingEmailAndPassword(req : Request, res : Response) {
    const nameUrl : String = String(req.query.name);
    const emailUrl : String = String(req.query.email);
    const passwordUrl : String = String(req.query.password);

    const accountServiceInstance : AccountService = new AccountService();
    const accessToken : String =
    await accountServiceInstance.signUpUserUsingEmailAndPassword(nameUrl, emailUrl, passwordUrl);

    if (accessToken === '') {
      res.status(400).send('User with this email already exists');
    } else {
      const payload : SignupResponsePayload = new SignupResponsePayload();
      payload.accessToken = accessToken;
      res.send({ payload });
    }
  }
}
