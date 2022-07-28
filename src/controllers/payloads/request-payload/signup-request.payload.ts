import Joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';
import ControllerBasePayload from '../../controller-base.controller';

export default class SignupRequestPayload extends ControllerBasePayload {
  @JoiSchema(Joi.string().required().min(3).max(30))
    name!: string;

  @JoiSchema(Joi.string().email().required())
    email!: string;

  @JoiSchema(Joi.string().required().min(8).max(64))
    password!: string;
}
