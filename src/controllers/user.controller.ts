/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import RequestContextHelper from '../common/helpers/request-context.helper';
import UserModel from '../common/models/user.model';
import UserService from '../services/user.service';
import UpdateUserRequestPayload from './payloads/request-payload/update-user-request.payload';
import UserResponsePayload from './payloads/response-payload/user-response.payload';

export default class UserController {
  public async getUserDetails(req : Request, res : Response) {
    const userId : String = String(RequestContextHelper.getContext().userId);

    const userServiceInstance = new UserService();
    const userModel : UserModel | null =
    await userServiceInstance.getUserUsingUserId(userId);

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

    const updateUserRequestPayload : UpdateUserRequestPayload =
    new UpdateUserRequestPayload(req.body.name, req.body.payloads, req.body.cityId);

    try {
      await updateUserRequestPayload.validate().validateAsync(req.body);
    } catch (err : any) {
      return res.status(400).send({ error: err.details[0].message });
    }

    const userServiceInstance = new UserService();
    const userModel : UserModel | null =
    await userServiceInstance.updateUserDetails(
      userId,
      updateUserRequestPayload.name,
      updateUserRequestPayload.phoneNumber,
      updateUserRequestPayload.cityId,
    );

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
