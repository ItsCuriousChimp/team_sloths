import UserModel from '../common/models/user.model';
import CityRepository from '../repositories/city.repository';
import UserRepository from '../repositories/user.repository';
import UnprocessableEntityError from '../common/errors/custom-errors/unprocessable.entity.error';

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
      throw new UnprocessableEntityError('Invalid city id');
    }
    const userRepositoryInstance = new UserRepository();
    const updatedUser : UserModel | null =
    await userRepositoryInstance.updateUserDetails(userId, name, phoneNumber, cityId);
    return updatedUser;
  }
}
