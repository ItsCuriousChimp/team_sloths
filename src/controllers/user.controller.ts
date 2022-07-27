import { Request, Response } from 'express';
import RequestContextHelper from '../common/helpers/request-context.helper';
import UserModel from '../common/models/user.model';
import UserService from '../services/user.service';
import mapper from '../common/mapper';
import UserResponsePayload from './payloads/user-response.payload';

export default class UserController {
  public async getUserDetails(req : Request, res : Response) {
    const { userId } = RequestContextHelper.getContext();

    const userServiceInstance = new UserService();
    const userModel = await userServiceInstance.getUserUsingUserId(String(userId));

    if (!userModel) {
      res.status(400).send('User with this user id does not exist.');
    } else {
      const payload: UserResponsePayload =
        mapper.map(userModel, UserModel, UserResponsePayload);
      res.send(payload);
    }
  }

  public async updateUserDetails(req : Request, res : Response) {
    const { userId } = RequestContextHelper.getContext();
    const { name } = req.body;
    const { phoneNumber } = req.body;
    const { cityId } = req.body;
    const userServiceInstance = new UserService();
    const userModel =
    await userServiceInstance.updateUserDetails(String(userId), name, phoneNumber, cityId);

    if (!userModel) {
      res.status(400).send('There was a problem with updating the details.');
    } else {
      const payload: UserResponsePayload =
        mapper.map(userModel, UserModel, UserResponsePayload);
      res.send(payload);
    }
  }
}
