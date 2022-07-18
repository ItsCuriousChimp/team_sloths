import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class AccountRepository {
  public async getAccount(email: string) {
    const account = await prisma.account.findFirst({
      where: {
        username: email,
      },
    });
    return account?.id;
  }

  public async createAccount(userName: string, passwordHash: string) {
    const account = await prisma.account.create({
      data: {
        username: userName,
        passwordHash,
      },
    });
    return account;
  }

  public async setUserId(userId: string, accountId: string) {
    await prisma.account.update({
      where: { id: accountId },
      data: {
        userId,
      },
    });
  }
}
