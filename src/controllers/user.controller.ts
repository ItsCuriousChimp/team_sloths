import { Request, Response } from 'express';
import RequestContextHelper from '../common/helpers/request-context.helper';
import UserService from '../services/user.service';
import UserResponsePayload from './payloads/user-response.payload';
import UserModel from '../common/models/user.model';
import mapper from '../mappings/mapper';

export default class UserController {
  public async getUserDetails(req : Request, res : Response) {
    const userId : String = String(RequestContextHelper.getContext().userId);

    const userServiceInstance = new UserService();
    const userModel = await userServiceInstance.getUserUsingUserId(userId);

    if (!userModel) {
      res.status(400).send('User with this user id does not exist.');
    } else {
      const payload = mapper.map(userModel, UserModel, UserResponsePayload);
      res.send(payload);
    }
  }

  public async updateUserDetails(req : Request, res : Response) {
    const userId : string = String(RequestContextHelper.getContext().userId);
    const { name } = req.body;
    const { phoneNumber } = req.body;
    const { cityId } = req.body;
    const userServiceInstance = new UserService();
    const userModel =
    await userServiceInstance.updateUserDetails(userId, name, phoneNumber, cityId);

    if (!userModel) {
      res.status(400).send('There was a problem with updating the details.');
    } else {
      const payload = mapper.map(userModel, UserModel, UserResponsePayload);
      res.send(payload);
    }
  }
}
