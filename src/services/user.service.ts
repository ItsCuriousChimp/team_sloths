import ArgumentValidationError from '../common/errors/argument-validation.error';
import UserModel from '../common/models/user.model';
import CityRepository from '../repositories/city.repository';
import UserRepository from '../repositories/user.repository';

export default class UserService {
  public async getUserUsingUserId(userId: string): Promise<UserModel | null> {
    const userRepositoryInstance: UserRepository = new UserRepository();
    const userByUserId: UserModel | null =
      await userRepositoryInstance.getUserUsingUserId(userId);
    if (userByUserId === null) {
      throw new ArgumentValidationError('Account Not Found');
    }
    return userByUserId;
  }

  public async updateUserDetails(
    userId: string,
    name: string,
    phoneNumber: string,
    cityId: string,
  ): Promise<UserModel | null> {
    const cityRepository = new CityRepository();
    const city = await cityRepository.getCityByCityId(cityId);
    if (cityId && city === null) {
      throw new ArgumentValidationError('City does not exist');
    }
    const userRepositoryInstance = new UserRepository();
    const updatedUser: UserModel | null =
        await userRepositoryInstance.updateUserDetails(userId, name, phoneNumber, cityId);
    if (updatedUser === null) { throw new ArgumentValidationError('Could not update user'); }
    return updatedUser;
  }
}
