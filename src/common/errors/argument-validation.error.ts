import BaseError from './base.error';

export default class ArgumentValidationError extends BaseError {
  constructor(message: string) {
    super('ArgumentValidationError', message);
  }
}
