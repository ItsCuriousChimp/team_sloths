/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import RequestContextHelper from '../common/helpers/request-context.helper';
import UserService from '../services/user.service';
import UserResponsePayload from './payloads/response-payload/user-response.payload';
import mapper from '../common/mapper';
import UserModel from '../common/models/user.model';
import UpdateUserRequestPayload from './payloads/request-payload/update-user-request.payload';
import BaseController from './base.controller';
import ArgumentValidationError from '../common/errors/custom-errors/argument.validation.error';
import UnprocessableEntityError from '../common/errors/custom-errors/unprocessable.entity.error';

export default class UserController extends BaseController {
  public async getUserDetails(req : Request, res : Response, next: NextFunction) {
    const { userId } = RequestContextHelper.getContext();

    const userServiceInstance = new UserService();
    const userModel : UserModel | null = await userServiceInstance.getUserUsingUserId(userId);

    if (!userModel) {
      next(new UnprocessableEntityError('User with this user id does not exist.'));
    } else {
      const userResponsePayloadInstance : UserResponsePayload =
      mapper.map(userModel, UserModel, UserResponsePayload);

      res.send(userResponsePayloadInstance);
    }
  }

  public async updateUserDetails(req : Request, res : Response, next: NextFunction) {
    const { userId } = RequestContextHelper.getContext();

    let updateUserRequestPayload : UpdateUserRequestPayload = new UpdateUserRequestPayload();
    try {
      updateUserRequestPayload = super.extractAndValidate(req.body, UpdateUserRequestPayload);
    } catch (err : any) {
      next(new ArgumentValidationError(err.message));
    }

    const userServiceInstance = new UserService();
    const userModel =
    await userServiceInstance.updateUserDetails(
      userId,
      updateUserRequestPayload.name,
      updateUserRequestPayload.phoneNumber,
      updateUserRequestPayload.cityId,
    );

    if (!userModel) {
      next(new UnprocessableEntityError('User with this user id does not exist.'));
    } else {
      const userResponsePayloadInstance : UserResponsePayload =
      mapper.map(userModel, UserModel, UserResponsePayload);

      res.send(userResponsePayloadInstance);
    }
  }
}
