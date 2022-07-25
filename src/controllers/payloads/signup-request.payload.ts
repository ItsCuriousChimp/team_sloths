import Joi from 'joi';

export default class SignupRequestResponsePayload {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public validate() {
    const schema = Joi.object().keys({
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email(),
      password: Joi.string()
        .min(6)
        .max(255)
        .required(),
    });
    return schema;
  }
}
