import { Request, Response } from 'express';
import AccountService from '../services/account.service';
import mapper from '../common/mapper';
import AccessTokenResponsePayload from './payloads/access-token-response.payload';

export default class AccountController {
  public async signUpUserUsingEmailAndPassword(req : Request, res : Response) {
    const nameUrl : string = req.body.name;
    const emailUrl : string = req.body.email;
    const passwordUrl : string = req.body.password;

    const accountServiceInstance : AccountService = new AccountService();
    const accessToken : string =
    await accountServiceInstance.signUpUserUsingEmailAndPassword(nameUrl, emailUrl, passwordUrl);

    if (accessToken === '') {
      res.status(400).send('User with this email already exists.');
    } else {
      const payload = mapper.map(accessToken, String, AccessTokenResponsePayload);
      res.json(payload);
    }
  }

  public async loginUsingEmailAndPassword(req: Request, res: Response) {
    const emailUrl : string = req.body.email;
    const passwordUrl : string = req.body.password;

    const accountServiceInstance : AccountService = new AccountService();
    const accessToken : string =
    await accountServiceInstance.loginUserUsingEmailAndPassword(emailUrl, passwordUrl);
    if (accessToken === '') {
      res.status(400).send('Email address or password incorrect');
    } else {
      const payload = mapper.map(accessToken, String, AccessTokenResponsePayload);
      res.json(payload);
    }
  }
}
