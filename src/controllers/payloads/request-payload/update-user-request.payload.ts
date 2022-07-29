import Joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';

export default class UpdateUserRequestPayload {
  @JoiSchema(Joi.string().min(3).optional())
    name: string = '';

  @JoiSchema(Joi.string().length(10).pattern(/^[0-9]+$/).optional())
    phoneNumber: string = '';

  @JoiSchema(Joi.string().guid().optional())
    cityId: string = '';
}
