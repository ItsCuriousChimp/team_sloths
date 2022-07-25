import { Request, Response } from 'express';
import RequestContextHelper from '../common/helpers/request-context.helper';
import UserService from '../services/user.service';
import UserResponsePayload from './payloads/user-response.payload';
import UserRequestPayload from './payloads/user-request.payload';

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

  // eslint-disable-next-line consistent-return
  public async updateUserDetails(req : Request, res : Response) {
    const userRequestPayload: UserRequestPayload =
    new UserRequestPayload(req.body.name, req.body.phoneNumber, req.body.cityId);
    const { error } = await userRequestPayload.validate().validateAsync(req.body);
    if (error) {
      return res.status(400).send({
        error: error.details[0].message,
      });
    }

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
      const payload = new UserResponsePayload();
      payload.id = userModel?.id;
      payload.name = userModel?.name;
      payload.phoneNumber = userModel?.phoneNumber;
      payload.email = userModel?.email;
      payload.cityId = userModel?.cityId;
      payload.city = userModel?.city;
      res.send(payload);
    }
  }
}
