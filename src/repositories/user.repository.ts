import { PrismaClient } from '@prisma/client';
import DateTimeHelper from '../common/helpers/datetime.helper';

const prisma: PrismaClient = new PrismaClient();

export default class UserRepository {
  public async createUser(name : String, email: String) : Promise<String> {
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

      return user.id;
    }

    // User with same email already exists
    return '';
  }
}
