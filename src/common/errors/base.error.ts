import ErrorCodes from './error-codes';

export default abstract class BaseError extends Error {
  public readonly name : string;
  errorCode :string;
  additionalDetails!: string;
  constructor(name : string, errorCode : string, additionalDetails? : string) {
    const message : string = (ErrorCodes as any)[errorCode];
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.errorCode = errorCode;
    if (additionalDetails) {
      this.additionalDetails = additionalDetails;
    }
    Error.captureStackTrace(this);
  }
}
