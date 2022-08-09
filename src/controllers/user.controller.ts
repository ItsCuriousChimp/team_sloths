/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import RequestContextHelper from '../common/helpers/request-context.helper';
import UserService from '../services/user.service';
import UserResponsePayload from './payloads/response-payload/user-response.payload';
import mapper from '../common/mapper';
import UserModel from '../common/models/user.model';
import UpdateUserRequestPayload from './payloads/request-payload/update-user-request.payload';
import BaseController from './base.controller';

export default class UserController extends BaseController {
  public async getUserDetails(req: Request, res: Response) {
    const { userId } = RequestContextHelper.getContext();

    const userServiceInstance = new UserService();
    const userModel: any = await userServiceInstance.getUserUsingUserId(userId);
    const userResponsePayloadInstance: UserResponsePayload =
        mapper.map(userModel, UserModel, UserResponsePayload);

    res.send(userResponsePayloadInstance);
  }

  public async updateUserDetails(req: Request, res: Response) {
    const { userId } = RequestContextHelper.getContext();

    const updateUserRequestPayload: UpdateUserRequestPayload =
    super.extractAndValidate(req.body, UpdateUserRequestPayload);

    const userServiceInstance = new UserService();
    const userModel: any = await userServiceInstance.updateUserDetails(
      userId,
      updateUserRequestPayload.name,
      updateUserRequestPayload.phoneNumber,
      updateUserRequestPayload.cityId,
    );
    const userResponsePayloadInstance: UserResponsePayload =
      mapper.map(userModel, UserModel, UserResponsePayload);

    res.send(userResponsePayloadInstance);
  }
}
