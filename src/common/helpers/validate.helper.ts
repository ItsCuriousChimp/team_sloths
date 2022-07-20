const Joi = require('joi');

export default class ValidateHelper {
  public signupValidate() {
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
