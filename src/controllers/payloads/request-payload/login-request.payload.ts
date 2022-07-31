import Joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';

export default class LoginRequestPayload {
  @JoiSchema(Joi.string().required().email())
    email: string = '';

  @JoiSchema(Joi.string().min(6).max(128).required())
    password: string = '';
}
