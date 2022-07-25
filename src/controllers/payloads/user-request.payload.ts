import Joi from 'joi';

const myCustomJoi = Joi.extend(require('joi-phone-number'));

export default class UserRequestResponsePayload {
  name: string = '';
  phoneNumber: string = '';
  password: string = '';

  constructor(name: string, phoneNumber: string, password: string) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }
  public validate() {
    const schema = Joi.object().keys({
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),
      phoneNumber: myCustomJoi.phoneNumber().required(),
      cityId: Joi.string()
        .min(6)
        .max(255)
        .required(),
    });
    return schema;
  }
}
