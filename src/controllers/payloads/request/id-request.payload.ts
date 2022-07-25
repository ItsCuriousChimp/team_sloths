import Joi from 'joi';

export default class IdRequestPayload {
  async validateAndExtract(id: String) {
    const schema = Joi.object({
      id: Joi.string().length(36).required(),
    });

    const validated = schema.validate({ id });
    if (validated.error) {
      return validated.error.message;
    }
    return null;
  }
}
