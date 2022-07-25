// import { Request, Response } from 'express';
// import UserService from '../services/user.services';
// import UserResponsePayload from './payloads/user-response.payload';
// import UserModel from '../common/models/user.model';

// export default class AccountProfileController {
//   public async getAccountProfile(req: Request, res: Response) {
//     const userId: String = String(req.query.userId);
//     const userServiceInstance: UserService = new UserService();
//     const user: UserModel | null = await userServiceInstance.getUserById(userId);
//     const result: UserResponsePayload = new UserResponsePayload();
//     result.id = user?.id;
//     result.name = user?.name;
//     result.email = user?.email;
//     result.phoneNumber = user?.phoneNumber;
//     result.city = user?.city;
//     result.cityId = user?.cityId;
//     res.json(result);
//   }
// }
