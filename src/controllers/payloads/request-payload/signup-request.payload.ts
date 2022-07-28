import Joi from 'joi';
import { JoiSchema, getClassSchema } from 'joi-class-decorators';
import RequestPayloadBase from './request-base.payload';

export default class SignupRequestPayload extends RequestPayloadBase {
  @JoiSchema(Joi.string().required().min(3).max(30))
    name!: string;

  @JoiSchema(Joi.string().email().required())
    email!: string;

  @JoiSchema(Joi.string().required().min(8).max(16))
    password!: string;

  constructor() {
    super(getClassSchema(SignupRequestPayload));
  }
}
