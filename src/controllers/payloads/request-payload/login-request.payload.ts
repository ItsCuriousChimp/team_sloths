import Joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';
import BaseContoller from './base.controller';

export default class LoginRequestPayload extends BaseContoller {
  @JoiSchema(Joi.string().required().email())
    email!: string;

  @JoiSchema(Joi.string().min(6).max(128).required())
    password!: string;
}
