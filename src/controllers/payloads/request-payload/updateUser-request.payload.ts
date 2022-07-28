import Joi from 'joi';
import { JoiSchema, getClassSchema } from 'joi-class-decorators';
import RequestPayloadBase from './base-request.payload';

export default class UpdateUserRequestPayload extends RequestPayloadBase {
  @JoiSchema(Joi.string().min(3).max(128))
    name!: string;

  @JoiSchema(Joi.number().positive().min(1000000000).max(9999999999))
    phoneNumber!: string;

  @JoiSchema(Joi.string().guid())
    cityId!: string;

  constructor() {
    super(getClassSchema(UpdateUserRequestPayload));
  }
}
