import Joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';
import BaseContoller from './base.controller';

export default class SignupRequestPayload extends BaseContoller {
  @JoiSchema(Joi.string().required().min(3).max(30))
    name!: string;

  @JoiSchema(Joi.string().email().required())
    email!: string;

  @JoiSchema(Joi.string().required().min(6).max(128))
    password!: string;
}
