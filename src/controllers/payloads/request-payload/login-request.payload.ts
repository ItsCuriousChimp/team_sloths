import Joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';

export default class LoginRequestPayload {
  @JoiSchema(Joi.string().email().required())
    email: string = '';

  @JoiSchema(Joi.string().required().min(8).max(64))
    password: string = '';
}
