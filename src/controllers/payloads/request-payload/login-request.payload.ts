import Joi from 'joi';

export default class LoginRequestPayload {
  email: string = '';
  password: string = '';

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public validateAndExtract() {
    const schema = Joi.object({
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
    const res =
    schema.validate({ email: this.email, password: this.password });
    if (res.error) {
      return res.error;
    }
    return null;
  }
}
