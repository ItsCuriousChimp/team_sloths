import { Prisma, PrismaClient } from '@prisma/client';
import DateTimeHelper from '../common/helpers/datetime.helper';
import UserModel from '../common/models/user.model';

const prisma: PrismaClient = new PrismaClient();

export default class UserRepository {
  public async createUser(
    prismaInstance : Prisma.TransactionClient,
    name : string,
    email: string,
  ) : Promise<string> {
    const userData = await prismaInstance.user.create({
      data: {
        name,
        email,
        loggedInAtUtc: new DateTimeHelper().getCurrentDate(),
      },
    });

    return userData.id;
  }

  public async getUserUsingUserId(userId : string) : Promise<UserModel | null> {
    const userData = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        city: true,
      },
    });
    return this.makeUserModel(userData);
  }

  public async updateUserDetails(
    userId: string,
    name : string,
    phoneNumber: string,
    cityId: string,
  ) : Promise<UserModel | null> {
    const userData = await prisma.user.update({
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
    return this.makeUserModel(userData);
  }

  private makeUserModel(userData : any) : UserModel | null {
    if (userData === null) { return null; }
    const userModel : UserModel = new UserModel(
      userData.id,
      userData.name,
      userData.email,
      userData.loggedInAtUtc,
    );
    if (userData.cityId !== null) {
      userModel.cityId = userData.cityId;
      userModel.city = userData.city?.name;
    }
    if (userData.phoneNumber !== null) {
      userModel.phoneNumber = userData.phoneNumber;
    }
    return userModel;
  }
}
