import BaseError from './base.error';

export default class UnauthorisedError extends BaseError {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
