import { getClassSchema } from 'joi-class-decorators';

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
      throw new Error(validate.error.message);
    }
    return destObj;
  }
}
