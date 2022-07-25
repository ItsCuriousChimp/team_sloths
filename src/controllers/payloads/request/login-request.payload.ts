import Joi from 'joi';

export default class LoginRequestPayload {
  async validateAndExtract(email: string, password: string) {
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

    const validated = schema.validate({ email, password });
    if (validated.error) {
      return validated.error.message;
    }
    return null;
  }
}
