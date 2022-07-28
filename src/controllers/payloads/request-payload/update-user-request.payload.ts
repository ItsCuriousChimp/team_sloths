import Joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';

export default class UpdateUserRequestPayload {
  @JoiSchema(Joi.string().min(3).optional())
    name!: string;

  @JoiSchema(Joi.string().length(10).optional())
    phoneNumber!: string;

  @JoiSchema(Joi.string().guid().optional())
    cityId!: string;
}
