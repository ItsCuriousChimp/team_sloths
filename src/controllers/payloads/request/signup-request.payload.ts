import Joi from 'joi';

export default class SignupRequestPayload {
  async validateAndExtract(name: string, email: string, password: string) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(128).required(),
      email: Joi.string().min(6).max(64).email()
        .required(),
      password: Joi.string().min(6).max(32).required(),
    });

    const validated = schema.validate({ name, email, password });
    if (validated.error) {
      return validated.error.message;
    }
    return null;
  }
}
