import UserRepository from '../repositories/user.repository';
import AccountRepository from '../repositories/account.repository';
import UserModel from '../common/models/user.model';
import RequestContextHelper from '../common/helpers/requestContext.helper';

export default class UserService {
  async getUser(): Promise<UserModel> {
    const accountId : any = RequestContextHelper.getContext().userId;
    const account = await new AccountRepository().getAccountById(accountId);
    const user = account?.user;
    const {
      id, name, email, loggedInAtUtc, cityId, phoneNumber, city,
    } = user;
    const userModel = new UserModel(id, name, email, loggedInAtUtc);
    userModel.cityId = cityId;
    userModel.phoneNumber = phoneNumber;
    userModel.city = city?.name;
    return user;
  }

  async updateUser(name: string, phoneNumber: string, cityId: string) {
    const accountId = String(RequestContextHelper.getContext().userId);
    const account = await new AccountRepository().getAccountById(accountId);
    const userId = await account?.user.id;
    const userRepository = new UserRepository();
    const updatedUser = await userRepository.updateUser(name, phoneNumber, cityId, userId);
    return updatedUser;
  }
}
