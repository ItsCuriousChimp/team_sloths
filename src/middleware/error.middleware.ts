import { Request, Response } from 'express';
import UnauthorisedError from '../common/errors/custom-errors/unauthorised.error';
import ArgumentValidationError from '../common/errors/custom-errors/argument.validation.error';
import NotFoundError from '../common/errors/custom-errors/not-found.error';
import UnprocessableEntityError from '../common/errors/custom-errors/unprocessable.entity.error';

export default class ErrorMiddleware {
  public static async handleError(err: any, req: Request, res: Response) {
    if (err instanceof ArgumentValidationError) {
      return res.status(400).send(err.message);
    }
    if (err instanceof UnauthorisedError) {
      return res.status(401).send(err.message);
    }
    if (err instanceof NotFoundError) {
      return res.status(404).send(err.message);
    }

    if (err instanceof UnprocessableEntityError) {
      return res.status(422).send(err.message);
    }

    return res.status(500).send(err.message);
  }
}
