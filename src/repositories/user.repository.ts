import { PrismaClient } from '@prisma/client';
import UserModel from '../common/models/user.model';

const prisma = new PrismaClient();

export default class UserRepository {
  public async createUser(name: string, email: string): Promise<UserModel> {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        loggedInAtUtc: new Date(),
      },
    });
    return new UserModel(newUser.id, newUser.name, newUser.email, newUser.loggedInAtUtc);
  }
}
