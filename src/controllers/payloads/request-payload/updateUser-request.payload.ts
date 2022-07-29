import Joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';

export default class UpdateUserRequestPayload {
  @JoiSchema(Joi.string().min(3).max(128))
    name: string = '';

  @JoiSchema(Joi.number().positive().min(1000000000).max(9999999999))
    phoneNumber: string = '';

  @JoiSchema(Joi.string().guid())
    cityId: string = '';
}
