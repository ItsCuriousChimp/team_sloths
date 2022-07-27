import { PrismaClient } from '@prisma/client';
import AccountModel from '../common/models/account.model';

const prisma: PrismaClient = new PrismaClient();

export default class AccountRepository {
  public async getAccountByUsername(
    username: string,
  ): Promise<AccountModel | null> {
    const record = await prisma.account.findFirst({
      where: {
        username,
      },
    });

    if (record === null) {
      return null;
    }
    const result = new AccountModel(
      record.id,
      record.username,
      record.passwordHash,
    );
    result.userId = String(record.userId);
    return result;
  }

  public async createAccountWithoutUserId(
    username: string,
    passwordHash: string,
  ): Promise<string> {
    const account = await prisma.account.create({
      data: {
        username,
        passwordHash,
      },
    });

    return account.id;
  }

  public async updateUserIdInAccount(
    userId: string,
    accountId: string,
  ): Promise<AccountModel> {
    const account = await prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        userId,
      },
    });

    const accountModel = new AccountModel(
      account.id,
      account.username,
      account.passwordHash,
    );
    accountModel.userId = String(account.userId);

    return accountModel;
  }
}
