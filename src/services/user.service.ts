import UserModel from '../common/models/user.model';
import CityRepository from '../repositories/city.repository';
import UserRepository from '../repositories/user.repository';

export default class UserService {
  public async getUserUsingUserId(userId: string) : Promise<UserModel> {
    const userRepositoryInstance : UserRepository = new UserRepository();
    const userByUserId : UserModel = await userRepositoryInstance.getUserUsingUserId(userId);
    return userByUserId;
  }

  public async updateUserDetails(
    userId: string,
    name : string,
    phoneNumber: string,
    cityId: string,
  ) : Promise<UserModel> {
    const cityRepository = new CityRepository();
    // check if city exists in database
    await cityRepository.getCityByCityId(cityId);
    const userRepositoryInstance = new UserRepository();
    const updatedUser : UserModel =
    await userRepositoryInstance.updateUserDetails(userId, name, phoneNumber, cityId);
    return updatedUser;
  }
}
