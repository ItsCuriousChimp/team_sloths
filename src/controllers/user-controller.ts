import { Request, Response } from 'express';
import UserService from '../services/user.services';
import UserResponsePayload from './payloads/user-response.payload';
import UserModel from '../common/models/user.model';
import RequestContextHelper from '../common/helpers/request-context.helper';
import UserRequestPayload from './payloads/user-request.payload';

export default class UserController {
  public async getProfile(req: Request, res: Response) {
    const userId: String = String(RequestContextHelper.getData().userId);
    const userServiceInstance: UserService = new UserService();
    const user: UserModel | null = await userServiceInstance.getUserById(userId);
    const result: UserResponsePayload = new UserResponsePayload();
    result.id = user?.id;
    result.name = user?.name;
    result.email = user?.email;
    result.phoneNumber = user?.phoneNumber;
    result.city = user?.city;
    result.cityId = user?.cityId;
    res.json(result);
  }

  public async updateProfile(req: Request, res: Response) {
    const userId: String = String(RequestContextHelper.getData().userId);
    const userRequestPayload: UserRequestPayload =
    new UserRequestPayload(req.body.name, req.body.phoneNumber, req.body.cityId);
    userRequestPayload.name = req.body.name;
    userRequestPayload.phoneNumber = req.body.phoneNumber;
    userRequestPayload.cityId = req.body.cityId;
    const userServiceInstance: UserService = new UserService();
    const user: UserModel | null =
    await userServiceInstance.updateUserById(
      userId,
      userRequestPayload.name,
      userRequestPayload.phoneNumber,
      userRequestPayload.cityId,
    );
    const result: UserResponsePayload = new UserResponsePayload();
    result.id = user?.id;
    result.name = user?.name;
    result.email = user?.email;
    result.phoneNumber = user?.phoneNumber;
    result.city = user?.city;
    result.cityId = user?.cityId;
    res.json(result);
  }
}
