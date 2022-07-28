import Joi from 'joi';
import { JoiSchema, getClassSchema } from 'joi-class-decorators';
import RequestPayloadBase from './request-base.payload';

export default class UpdateUserRequestPayload extends RequestPayloadBase {
  @JoiSchema(Joi.string().min(3).optional())
    name!: string;
  @JoiSchema(Joi.string().length(10).optional())
    phoneNumber!: string;
  @JoiSchema(Joi.string().guid().optional())
    cityId!: string;

  constructor() {
    super(getClassSchema(UpdateUserRequestPayload));
  }
}
