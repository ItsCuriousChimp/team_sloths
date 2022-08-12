import { NextFunction, Request, Response } from 'express';
import UnauthorisedError from '../common/errors/custom-errors/unauthorised.error';
import ArgumentValidationError from '../common/errors/custom-errors/argument.validation.error';
import UnprocessableEntityError from '../common/errors/custom-errors/unprocessable.entity.error';

export default class ErrorMiddleware {
  // eslint-disable-next-line no-unused-vars
  public static async handleError(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ArgumentValidationError) {
      return res.status(400).send(err.message);
    }
    if (err instanceof UnauthorisedError) {
      return res.status(401).send(err.message);
    }

    if (err instanceof UnprocessableEntityError) {
      return res.status(422).send(err.message);
    }

    return res.status(500).send(err.message);
  }
}
