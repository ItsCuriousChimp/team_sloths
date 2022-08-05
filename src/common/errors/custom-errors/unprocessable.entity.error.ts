import BaseError from './base.error';

export default class UnprocessableEntityError extends BaseError {
  message!: string;
  additionalInfo!: any;

  constructor(message: string, additionalInfo: any = {}) {
    super(message);
    this.message = message;
    this.additionalInfo = additionalInfo;
  }
}
