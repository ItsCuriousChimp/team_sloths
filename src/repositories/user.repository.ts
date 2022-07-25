import { PrismaClient } from '@prisma/client';
import DateTimeHelper from '../common/helpers/datetime.helper';
import UserModel from '../common/models/user.model';

const prisma: PrismaClient = new PrismaClient();

export default class UserRepository {
  public async createUser(name : string, email: string) : Promise<string> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        loggedInAtUtc: new DateTimeHelper().getCurrentDate(),
      },
    });
    return user.id;
  }
  public async getUserById(userId : String) : Promise<UserModel | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: String(userId),
      },
    });
    if (user === null) { return null; }
    const userModel : UserModel = new UserModel(
      user.id,
      user.name,
      user.email,
      user.loggedInAtUtc,
    );
    if (user.cityId !== null) {
      userModel.cityId = user.cityId;
    }
    if (user.phoneNumber !== null) {
      userModel.phoneNumber = user?.phoneNumber;
    }
    return userModel;
  }

  public async updateUserById(
    userId: String,
    userName: String,
    userPhoneNumber: String,
    userCityId: String,
  ): Promise<UserModel | null> {
    const userUpdated = await prisma.user.update({
      where: {
        id: String(userId),
      },
      data: {
        name: String(userName),
        cityId: String(userCityId),
        phoneNumber: String(userPhoneNumber),
      },
    });
    if (userUpdated === null) { return null; }
    const userModel : UserModel = new UserModel(
      userUpdated.id,
      userUpdated.name,
      userUpdated.email,
      userUpdated.loggedInAtUtc,
    );
    if (userUpdated.cityId !== null) {
      userModel.cityId = userUpdated.cityId;
    }
    if (userUpdated.phoneNumber !== null) {
      userModel.phoneNumber = userUpdated.phoneNumber;
    }
    return userModel;
  }
}
