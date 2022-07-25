import Joi from 'joi';

export default class UpdateUserRequestPayload {
  async validateAndExtract(name: string, phoneNumber: string, cityId: string) {
    const schema = Joi.object().keys({
      name: Joi.string()
        .min(3)
        .max(128),
      phoneNumber: Joi.number()
        .positive()
        .min(1000000000)
        .max(9999999999),
      cityId: Joi.string()
        .alphanum(),
    });

    const validated = schema.validate({ name, phoneNumber, cityId });
    if (validated.error) {
      return validated.error.message;
    }
    return null;
  }
}
