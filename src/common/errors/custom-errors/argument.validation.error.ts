import BaseError from './base.error';
// export default class ArgumentValidationError extends Error {
//   public name: string;
//   public message: string;
//   public stack?: string;
//   public innerError?: Error;
//   public innerErrorName?: string;
//   public innerErrorMessage?: string;
//   public innerErrorStack?: string;

//   constructor(message: string, innerError?: Error) {
//     super(message);
//     this.name = 'ArgumentValidationError';
//     this.message = message;
//     this.innerError = innerError;
//     if (innerError) {
//       this.innerErrorName = innerError.name;
//       this.innerErrorMessage = innerError.message;
//       this.innerErrorStack = innerError.stack;
//     }
//     this.stack = (new Error(message)).stack;
//   }
// }
export default class ArgumentValidationError extends BaseError {
  message!: string;
  additionalInfo!: any;

  constructor(message: string, additionalInfo: any = {}) {
    super(message);
    this.message = message;
    this.additionalInfo = additionalInfo;
  }
}
