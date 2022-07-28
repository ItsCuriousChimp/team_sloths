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

  public async getUserUsingUserId(userId : string) : Promise<UserModel | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        city: true,
      },
    });
    return this.createUserModel(user);
  }

  public async updateUserDetails(
    userId: string,
    name : string,
    phoneNumber: string,
    cityId: string,
  ) : Promise<UserModel | null> {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        phoneNumber,
        cityId,
      },
      include: {
        city: true,
      },
    });
    return this.createUserModel(user);
  }

  private createUserModel(user : any) : UserModel | null {
    if (user === null) { return null; }
    const userModel : UserModel = new UserModel(
      user.id,
      user.name,
      user.email,
      user.loggedInAtUtc,
    );
    if (user.cityId !== null) {
      userModel.cityId = user.cityId;
      userModel.city = user.city?.name;
    }
    if (user.phoneNumber !== null) {
      userModel.phoneNumber = user.phoneNumber;
    }
    return userModel;
  }
}
