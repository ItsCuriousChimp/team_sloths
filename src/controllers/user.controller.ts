/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import RequestContextHelper from '../common/helpers/request-context.helper';
import UserService from '../services/user.service';
import UserResponsePayload from './payloads/response-payload/user-response.payload';
import mapper from '../common/mapper';
import UserModel from '../common/models/user.model';
import UpdateUserRequestPayload from './payloads/request-payload/update-user-request.payload';
import BaseController from './base.controller';

export default class UserController extends BaseController {
  public async getUserDetails(req : Request, res : Response, next: NextFunction) {
    const { userId } = RequestContextHelper.getContext();

    const userServiceInstance = new UserService();
    let userModel : UserModel;
    try {
      userModel = await userServiceInstance.getUserUsingUserId(userId);
    } catch (err) {
      return next(err);
    }
    const userResponsePayloadInstance : UserResponsePayload =
    mapper.map(userModel, UserModel, UserResponsePayload);

    res.send(userResponsePayloadInstance);
  }

  public async updateUserDetails(req : Request, res : Response, next : NextFunction) {
    const { userId } = RequestContextHelper.getContext();

    let updateUserRequestPayload : UpdateUserRequestPayload = new UpdateUserRequestPayload();
    try {
      updateUserRequestPayload = super.extractAndValidate(req.body, UpdateUserRequestPayload);
    } catch (err : any) {
      return next(err);
    }

    const userServiceInstance = new UserService();
    let userModel : UserModel;
    try {
      userModel = await userServiceInstance.updateUserDetails(
        userId,
        updateUserRequestPayload.name,
        updateUserRequestPayload.phoneNumber,
        updateUserRequestPayload.cityId,
      );
    } catch (err) {
      return next(err);
    }
    const userResponsePayloadInstance : UserResponsePayload =
      mapper.map(userModel, UserModel, UserResponsePayload);

    res.send(userResponsePayloadInstance);
  }
}
