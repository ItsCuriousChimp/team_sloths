/* eslint-disable no-unused-vars */
import { Response, Request, NextFunction } from 'express';
import ArgumentValidationError from '../common/errors/argument-validation.error';
import UnauthorizedError from '../common/errors/unauthorized.error';
import ErrorCodes from '../common/errors/error-codes';

export default class ErrorHandlerMiddleware {
  handleError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    let statusCode: number;
    let errorResponse;
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
  }
}
