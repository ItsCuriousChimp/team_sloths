import BaseError from './base.error';

export default class UnauthorizedError extends BaseError {
  name : string = 'UnauthorizedError';
  message : string;
  constructor(message : string) {
    super('UnauthorizedError', message);
    this.message = message;
  }
}
