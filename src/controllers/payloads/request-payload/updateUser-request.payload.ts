import Joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';
import BaseContoller from './base.controller';

export default class UpdateUserRequestPayload extends BaseContoller {
  @JoiSchema(Joi.string().min(3).max(128))
    name!: string;

  @JoiSchema(Joi.number().positive().min(1000000000).max(9999999999))
    phoneNumber!: string;

  @JoiSchema(Joi.string().guid())
    cityId!: string;
}
