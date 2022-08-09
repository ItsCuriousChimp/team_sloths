import { getClassSchema } from 'joi-class-decorators';
import ArgumentValidationError from '../common/errors/argument-validation.error';
// import { E0101 } from '../common/errors/error-codes';

export default class BaseController {
  public extractAndValidate(src: any, destClass: any) {
    // eslint-disable-next-line new-cap
    const destObj = new destClass();
    Object.keys(destObj).forEach((key) => {
      destObj[key] = src[key];
    });
    const schema = getClassSchema(destClass);
    const validate : any = schema.validate(destObj);
    if (validate.error) {
      throw new ArgumentValidationError('E0101', validate.error.message);
    }
    return destObj;
  }
}
