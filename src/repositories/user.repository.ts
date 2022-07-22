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

  public async updateUser(name: string, phoneNumber: string, cityId: string, userId: string) {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        phoneNumber,
        cityId,
      },
      include: { city: true },
    });
    const {
      id, email, loggedInAtUtc, city,
    } = updatedUser;
    const userModel = new UserModel(id, name, email, loggedInAtUtc);
    userModel.cityId = cityId;
    userModel.city = city?.name;
    userModel.phoneNumber = phoneNumber;
    return userModel;
  }
}
