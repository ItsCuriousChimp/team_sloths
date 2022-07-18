import { PrismaClient } from '@prisma/client';
import DateTimeHelper from '../common/helpers/datetime.helper';
import UserModel from '../common/models/user.model';

const prisma: PrismaClient = new PrismaClient();

export default class UserRepository {
  public async createUser(name : String, email: String) : Promise<UserModel> {
    const userExists = await prisma.user.findFirst({
      where: {
        email: String(email),
      },
    });
    if (userExists === null) {
      const user = await prisma.user.create({
        data: {
          name: String(name),
          email: String(email),
          loggedInAtUtc: new DateTimeHelper().getCurrentDate(),
        },
      });
      const userModel = new UserModel(user.id, user.name, user.email, user.loggedInAtUtc);
      return userModel;
    }
    // User with same email already exists
    return new UserModel('', '', '', new DateTimeHelper().getCurrentDate());
  }
}
