import Joi from 'joi';
import { JoiSchema, getClassSchema } from 'joi-class-decorators';
import RequestPayloadBase from './base-request.payload';

export default class LoginRequestPayload extends RequestPayloadBase {
  @JoiSchema(Joi.string().required().email())
    email!: string;

  @JoiSchema(Joi.string().min(6).max(128).required())
    password!: string;

  constructor() {
    super(getClassSchema(LoginRequestPayload));
  }
}
