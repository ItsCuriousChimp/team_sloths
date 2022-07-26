import Joi from 'joi';

export default class UpdateUserRequestPayload {
  name: string = '';
  phoneNumber: string = '';
  cityId: string = '';

  constructor(name: string, phoneNumber: string, cityId: string) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.cityId = cityId;
  }

  public validateAndExtract() {
    const schema = Joi.object({
      name: Joi.string()
        .min(3)
        .max(128)
        .optional(),
      phoneNumber: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .optional(),
      cityId: Joi.string()
        .min(36)
        .max(36)
        .optional(),
    });
    const res =
    schema.validate({ name: this.name, phoneNumber: this.phoneNumber, cityId: this.cityId });
    if (res.error) {
      return res.error;
    }
    return null;
  }
}
