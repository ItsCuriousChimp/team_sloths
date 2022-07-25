import UserModel from '../common/models/user.model';
import UserRepository from '../repositories/user.repository';

export default class UserService {
  public async getUserById(userId: String): Promise<UserModel | null> {
    const userRepositoryInstance : UserRepository = new UserRepository();
    const userByUserId : UserModel | null = await userRepositoryInstance.getUserById(userId);
    return userByUserId;
  }
  public async updateUserById(
    userId: String,
    name: String,
    phoneNumber: String,
    cityId: String,
  ): Promise<UserModel | null> {
    const userRepositoryInstance : UserRepository = new UserRepository();
    const userByUserId : UserModel | null =
    await userRepositoryInstance.updateUserById(userId, name, phoneNumber, cityId);
    return userByUserId;
  }
}
