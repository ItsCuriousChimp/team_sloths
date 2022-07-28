import { Request, Response } from 'express';
import RequestContextHelper from '../common/helpers/request-context.helper';
import UserService from '../services/user.service';
import UserResponsePayload from './payloads/response-payload/user-response.payload';
import mapper from '../common/mapper';
import UserModel from '../common/models/user.model';

export default class UserController {
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
    const { name, phoneNumber, cityId } = req.body;
    const userServiceInstance = new UserService();
    const userModel =
    await userServiceInstance.updateUserDetails(userId, name, phoneNumber, cityId);

    if (!userModel) {
      res.status(400).send('There was a problem with updating the details.');
    } else {
      const userResponsePayloadInstance : UserResponsePayload =
      mapper.map(userModel, UserModel, UserResponsePayload);

      res.send(userResponsePayloadInstance);
    }
  }
}
