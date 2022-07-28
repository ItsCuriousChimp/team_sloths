import Joi from 'joi';
import { getClassSchema } from 'joi-class-decorators';

const instance : any = this;
export default class ControllerBasePayload {
  private schema!: Joi.Schema;

  public extractAndValidate(src: any, Dest: any) {
    const destObj = new Dest();
    Object.keys(src).forEach((key) => {
      destObj[key] = src[key];
    });
    instance.schema = getClassSchema(Dest);
    const validate : any = instance.schema.validate(destObj);
    if (validate.error) {
      throw validate.error.details[0].message;
    } else {
      return destObj;
    }
  }
}
