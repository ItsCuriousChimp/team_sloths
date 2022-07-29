import Joi from 'joi';
import { getClassSchema } from 'joi-class-decorators';

export default class BaseContoller {
  validateAndExtract(src: any, DestClass: any) {
    const destObj = new DestClass();
    const keys = Object.keys(src);
    keys.forEach((key) => {
      destObj[key] = src[key];
    });
    const schema: Joi.Schema = getClassSchema(DestClass);
    const val = schema.validate(destObj);
    if (val.error) {
      throw new Error(val.error.message);
    }
    return destObj;
  }
}
