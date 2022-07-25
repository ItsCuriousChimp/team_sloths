import Joi from 'joi';

export default class LoginRequestPayload {
  email: string = '';
  password: string = '';

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public validate() {
    const schema = Joi.object().keys({
      email: Joi.string()
        .min(6)
        .max(64)
        .required()
        .email(),
      password: Joi.string()
        .min(6)
        .max(32)
        .required(),
    });
    return schema;
  }
}
