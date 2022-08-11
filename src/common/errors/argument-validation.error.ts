import BaseError from './base.error';

export default class ArgumentValidationError extends BaseError {
  constructor(errorCode: string, additionalDetails? : string) {
    super('ArgumentValidationError', errorCode, additionalDetails);
  }
}
