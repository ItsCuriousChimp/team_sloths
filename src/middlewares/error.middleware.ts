/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import UnauthorizedError from '../common/errors/unauthorized.error';
import ArgumentValidationError from '../common/errors/argument-validation.error';
import ErrorCodes from '../common/errors/error-codes';
import APIErrorResponsePayload from './payloads/api-error-response.payload ';

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode : number;
  const errorResponse : APIErrorResponsePayload = new APIErrorResponsePayload();
  errorResponse.errorCode = err.errorCode;
  errorResponse.errorMessage = err.message;
  errorResponse.additionalDetails = err.additionalDetails;
  switch (err.constructor) {
    case UnauthorizedError:
      statusCode = 401;
      break;
    case ArgumentValidationError:
      statusCode = 400;
      break;
    default:
      statusCode = 500;
  }
  res.status(statusCode).send(errorResponse);
};

export default errorHandlerMiddleware;
