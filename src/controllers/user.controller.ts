import { Request, Response } from 'express';
import RequestContextHelper from '../common/helpers/request-context.helper';
import UserService from '../services/user.service';
import UserResponsePayload from './payloads/user-response.payload';
import UpdateUserRequestPayload from './payloads/request/updateUser-request.payload';

export default class UserController {
  public async getUserDetails(req : Request, res : Response) {
    const userId : String = String(RequestContextHelper.getContext().userId);

    const userServiceInstance = new UserService();
    const userModel = await userServiceInstance.getUserUsingUserId(userId);

    if (!userModel) {
      res.status(400).send('User with this user id does not exist.');
    } else {
      const payload = new UserResponsePayload();
      payload.id = userModel.id;
      payload.name = userModel.name;
      payload.phoneNumber = userModel.phoneNumber;
      payload.email = userModel.email;
      payload.cityId = userModel.cityId;
      payload.city = userModel.city;
      res.send(payload);
    }
  }

  public async updateUserDetails(req : Request, res : Response) {
    const userId : string = String(RequestContextHelper.getContext().userId);
    const { name, phoneNumber, cityId } = req.body;
    const updateUserRequestPayload =
    await new UpdateUserRequestPayload().validateAndExtract(name, phoneNumber, cityId);
    if (updateUserRequestPayload) {
      res.status(400).send(updateUserRequestPayload);
      return;
    }
    const userServiceInstance = new UserService();
    const userModel =
    await userServiceInstance.updateUserDetails(userId, name, phoneNumber, cityId);

    if (!userModel) {
      res.status(400).send('There was a problem with updating the details.');
    } else {
      const payload = new UserResponsePayload();
      payload.id = userModel.id;
      payload.name = userModel.name;
      payload.phoneNumber = userModel.phoneNumber;
      payload.email = userModel.email;
      payload.cityId = userModel.cityId;
      payload.city = userModel.city;
      res.send(payload);
    }
  }
}
