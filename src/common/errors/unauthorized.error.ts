import BaseError from './base.error';

export default class UnauthorizedError extends BaseError {
  constructor(errorCode: string, additionalDetails? : string) {
    super('UnauthorizedError', errorCode, additionalDetails);
  }
}
