import Joi from 'joi';
import { getClassSchema } from 'joi-class-decorators';

export default class ControllerBasePayload {
  private schema!: Joi.Schema;

  validateAndExtract(src: any, Dest: any) {
    const destObj = new Dest();
    const keys = Object.keys(src);
    keys.forEach((key) => {
      destObj[key] = src[key];
    });
    this.schema = getClassSchema(Dest);
    const val = this.schema.validate(destObj);
    if (val.error) {
      throw val.error.message;
    }
    return destObj;
  }
}
