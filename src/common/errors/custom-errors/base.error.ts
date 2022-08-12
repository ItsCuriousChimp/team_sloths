export default class BaseError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// export default abstract class BaseError extends Error {
//   public readonly name : string;
//   constructor(name : string, message : string) {
//     super(message);
//     Object.setPrototypeOf(this, new.target.prototype);
//     this.name = name;
//     Error.captureStackTrace(this);
//   }
// }
