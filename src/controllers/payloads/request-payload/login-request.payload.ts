import Joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';
import ControllerBasePayload from './base-request.payload';

export default class LoginRequestPayload extends ControllerBasePayload {
  @JoiSchema(Joi.string().required().email())
    email!: string;

  @JoiSchema(Joi.string().min(6).max(128).required())
    password!: string;
}
