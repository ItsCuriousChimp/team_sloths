import Joi from 'joi';

export default class IdRequestPayload {
  id: string = '';

  constructor(id: string) {
    this.id = id;
  }

  public validateAndExtract() {
    const schema = Joi.object().keys({
      id: Joi.string()
        .length(36)
        .required(),
    });
    const res =
    schema.validate({ id: this.id });
    if (res.error) {
      return res.error;
    }
    return null;
  }
}
