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
  public async getUserUsingUserId(userId : String) : Promise<UserModel | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: String(userId),
      },
    });
    console.log(userId);
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
}
