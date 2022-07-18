import { PrismaClient, account } from '@prisma/client';

const prisma = new PrismaClient();

export default class AccountRepository {
  public async getAccount(email: string): Promise<account | null> {
    const foundAccount = await prisma.account.findUnique({
      where: {
        username: email,
      },
    });
    return foundAccount;
  }

  public async createAccount(username: string, passwordHash: string): Promise<account> {
    const newAccount = await prisma.account.create({
      data: {
        username,
        passwordHash,
      },
    });
    return newAccount;
  }

  public async setUserId(userId: string, accountId: string): Promise<void> {
    await prisma.account.update({
      where: { id: accountId },
      data: {
        userId,
      },
    });
  }
}
