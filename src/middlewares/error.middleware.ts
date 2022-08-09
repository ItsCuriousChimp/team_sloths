/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import UnauthorizedError from '../common/errors/unauthorized.error';
import ArgumentValidationError from '../common/errors/argument-validation.error';
import ErrorCodes from '../common/errors/error-codes';

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode : number;
  let errorResponse : string;
  switch (err.constructor) {
    case UnauthorizedError:
      errorResponse = ErrorCodes.E0100;
      statusCode = 401;
      break;
    case ArgumentValidationError:
      errorResponse = ErrorCodes.E0101;
      statusCode = 400;
      break;
    default:
      errorResponse = ErrorCodes.E0001;
      statusCode = 500;
  }
  res.status(statusCode).send(errorResponse);
};

export default errorHandlerMiddleware;
