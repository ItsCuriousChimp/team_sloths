import { Request, Response } from 'express';
import AccountModel from '../common/models/account.model';
import AccountService from '../services/account.service';
import SignupResponsePayload from './payloads/signup-response.payload';

export default class AccountController {
  public async signUpUserUsingEmailAndPassword(req : Request, res : Response) {
    const nameUrl : String = String(req.query.name);
    const emailUrl : String = String(req.query.email);
    const passwordUrl : String = String(req.query.password);
    const accountServiceInstance : AccountService = new AccountService();
    const accountModel : AccountModel =
    await accountServiceInstance.signUpUserUsingEmailAndPassword(nameUrl, emailUrl, passwordUrl);
    if (accountModel.id === '') {
      res.status(409).send('User with this email already exists');
    } else {
      const result : SignupResponsePayload = new SignupResponsePayload();
      result.jwtToken = accountModel.jwtToken;
      res.send({ result });
    }
  }
}
