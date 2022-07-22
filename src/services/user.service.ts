import UserModel from '../common/models/user.model';
import UserRepository from '../repositories/user.repository';

export default class UserService {
  public async getUserUsingUserId(userId: String) : Promise<UserModel | null> {
    const userRepositoryInstance : UserRepository = new UserRepository();
    const userByUserId : UserModel | null = await userRepositoryInstance.getUserUsingUserId(userId);
    return userByUserId;
  }

  public async updateUserDetails(
    userId: String,
    name : String,
    phoneNumber: String,
    cityId: String,
  ) {
    const userRepositoryInstance = new UserRepository();
    const updatedUser =
    userRepositoryInstance.updateUserDetails(userId, name, phoneNumber, cityId);
    return updatedUser;
  }
}
