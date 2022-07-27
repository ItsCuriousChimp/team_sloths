import UserModel from '../common/models/user.model';
import CityRepository from '../repositories/city.repository';
import UserRepository from '../repositories/user.repository';

export default class UserService {
  public async getUserUsingUserId(userId: string) : Promise<UserModel | null> {
    const userRepositoryInstance : UserRepository = new UserRepository();
    const userByUserId : UserModel | null = await userRepositoryInstance.getUserUsingUserId(userId);
    return userByUserId;
  }

  public async updateUserDetails(
    userId: string,
    name : string,
    phoneNumber: string,
    cityId: string,
  ) : Promise<UserModel | null> {
    const cityRepository = new CityRepository();
    const city = await cityRepository.getCityByCityId(cityId);
    if (cityId && city === null) {
      return null;
    }
    const userRepositoryInstance = new UserRepository();
    const updatedUser : UserModel | null =
    await userRepositoryInstance.updateUserDetails(userId, name, phoneNumber, cityId);
    return updatedUser;
  }
}
