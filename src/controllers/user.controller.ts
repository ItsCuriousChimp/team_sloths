import { Request, Response } from 'express';
import UserService from '../services/user.service';
import UserResponsePayload from './payloads/user-response.payload';

export default class UserController {
  async getUser(req: Request, res: Response): Promise<void> {
    const userService = new UserService();
    const user = await userService.getUser();
    const {
      id, name, email, loggedInAtUtc, phoneNumber, cityId, city,
    } = user;
    const userResponsePayload = new UserResponsePayload();
    userResponsePayload.id = id;
    userResponsePayload.name = name;
    userResponsePayload.city = city;
    userResponsePayload.cityId = cityId;
    userResponsePayload.email = email;
    userResponsePayload.loggedInAtUtc = loggedInAtUtc;
    userResponsePayload.phoneNumber = phoneNumber;
    res.json(userResponsePayload);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const userService = new UserService();
    const { name, phoneNumber, cityId } = req.body;
    const updatedUser = await userService.updateUser(name, phoneNumber, cityId);
    const userResponsePayload = new UserResponsePayload();
    userResponsePayload.id = updatedUser.id;
    userResponsePayload.name = updatedUser.name;
    userResponsePayload.city = updatedUser.city;
    userResponsePayload.cityId = updatedUser.cityId;
    userResponsePayload.email = updatedUser.email;
    userResponsePayload.loggedInAtUtc = updatedUser.loggedInAtUtc;
    userResponsePayload.phoneNumber = updatedUser.phoneNumber;
    res.json(userResponsePayload);
  }
}
