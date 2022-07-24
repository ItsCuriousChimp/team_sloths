import UserModel from '../common/models/user.model';
import UserRepository from '../repositories/user.repository';

export default class UserService {
  public async getUserById(userId: String): Promise<UserModel | null> {
    const userRepositoryInstance : UserRepository = new UserRepository();
    const userByUserId : UserModel | null = await userRepositoryInstance.getUserUsingUserId(userId);
    return userByUserId;
  }
}
