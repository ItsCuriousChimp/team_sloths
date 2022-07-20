import { PrismaClient } from '@prisma/client';
import DateTimeHelper from '../common/helpers/datetime.helper';

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
}
