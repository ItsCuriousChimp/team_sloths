import BaseError from './base.error';

export default class ArgumentValidationError extends BaseError {
  message : string;
  constructor(message : string) {
    super('ArgumentValidationError', message);
    this.message = message;
  }
}
