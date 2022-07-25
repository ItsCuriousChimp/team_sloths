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

  public validate() {
    const schema = Joi.object().keys({
      name: Joi.string()
        .min(3)
        .max(128)
        .optional(),
      phoneNumber: Joi.number()
        .min(1000000000)
        .max(9999999999)
        .optional(),
      cityId: Joi.string()
        .min(36)
        .max(36)
        .optional(),

    });
    return schema;
  }
}
