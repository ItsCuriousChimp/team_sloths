import BaseError from './base.error';

export default class UnauthorisedError extends BaseError {
  message!: string;
  additionalInfo!: any;

  constructor(message: string, additionalInfo: any = {}) {
    super(message);
    this.message = message;
    this.additionalInfo = additionalInfo;
  }
}
