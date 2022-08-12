import BaseError from './base.error';

export default class UnprocessableEntityError extends BaseError {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
