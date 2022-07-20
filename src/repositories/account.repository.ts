import { PrismaClient } from '@prisma/client';
import AccountModel from '../common/models/account.model';

const prisma = new PrismaClient();

export default class AccountRepository {
  public async getAccount(email: string): Promise<AccountModel | null> {
    const account = await prisma.account.findUnique({
      where: {
        username: email,
      },
    });
    if (account) {
      const { id, username, passwordHash } = account;
      return new AccountModel(id, username, passwordHash);
    }
    return null;
  }

  public async getAccountById(id: string): Promise<AccountModel | null> {
    const account = await prisma.account.findUnique({
      where: {
        id,
      },
    });
    if (account) {
      const { username, passwordHash } = account;
      return new AccountModel(id, username, passwordHash);
    }
    return null;
  }

  public async createAccount(username: string, passwordHash: string): Promise<AccountModel> {
    const newAccount = await prisma.account.create({
      data: {
        username,
        passwordHash,
      },
    });
    return new AccountModel(newAccount.id, newAccount.username, newAccount.passwordHash);
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
