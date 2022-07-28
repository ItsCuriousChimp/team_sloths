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
  public async getUserDetails(req : Request, res : Response) {
    const { userId } = RequestContextHelper.getContext();

    const userServiceInstance = new UserService();
    const userModel : UserModel | null = await userServiceInstance.getUserUsingUserId(userId);

    if (!userModel) {
      res.status(400).send('User with this user id does not exist.');
    } else {
      const userResponsePayloadInstance : UserResponsePayload =
      mapper.map(userModel, UserModel, UserResponsePayload);

      res.send(userResponsePayloadInstance);
    }
  }

  public async updateUserDetails(req : Request, res : Response) {
    const { userId } = RequestContextHelper.getContext();

    let updateUserRequestPayload : UpdateUserRequestPayload = new UpdateUserRequestPayload();
    try {
      updateUserRequestPayload = super.extractAndValidate(req.body, UpdateUserRequestPayload);
    } catch (err : any) {
      return res.status(400).send(err.message);
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
      res.status(400).send('There was a problem with updating the details.');
    } else {
      const userResponsePayloadInstance : UserResponsePayload =
      mapper.map(userModel, UserModel, UserResponsePayload);

      res.send(userResponsePayloadInstance);
    }
  }
}
