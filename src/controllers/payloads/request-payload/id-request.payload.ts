import Joi from 'joi';

export default class IdRequestPayload {
  id: string = '';

  constructor(id: string) {
    this.id = id;
  }

  public validate() {
    const schema = Joi.object().keys({
      id: Joi.string()
        .length(36)
        .required(),
    });
    return schema;
  }
}
