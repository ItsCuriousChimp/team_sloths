import Joi from 'joi';

export default class RequestPayloadBase {
  private schema: Joi.Schema;
  obj: any = {};
  constructor(schema: Joi.Schema) {
    this.schema = schema;
  }

  extractAndValidate(req: any) {
    Object.keys(req).forEach((key) => {
      this.obj[key] = req[key];
    });
    return this.schema.validate(this.obj);
  }
}
