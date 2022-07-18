import { Request, Response } from 'express';
import SignupService from '../services/signup.service';
import AccessTokenResponsePayload from './payloads/accessToken-response.payload';

export default class SignupController {
  public async signupUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    const signupService = new SignupService().signupUser(name, email, password);
    const signupPayload = new AccessTokenResponsePayload();
    const signupServiceResponse = await signupService;
    signupPayload.token = signupServiceResponse;
    res.json(signupPayload);
  }
}
