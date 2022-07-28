import { Request, Response } from 'express';
import RequestContextHelper from '../common/helpers/request-context.helper';
import UserService from '../services/user.service';
import UserResponsePayload from './payloads/response-payload/user-response.payload';
import mapper from '../common/mapper';
import UserModel from '../common/models/user.model';
import UpdateUserRequestPayload from './payloads/request-payload/update-user-request.payload';

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

    const updateUserRequestPayload = new UpdateUserRequestPayload();
    const validate: any = updateUserRequestPayload.extractAndValidate(req.body);

    if (validate.error) {
      res.status(401).send(validate.error?.details[0].message);
      return;
    }

    const userServiceInstance = new UserService();
    const userModel =
    await userServiceInstance.updateUserDetails(
      userId,
      updateUserRequestPayload.obj.name,
      updateUserRequestPayload.obj.phoneNumber,
      updateUserRequestPayload.obj.cityId,
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
