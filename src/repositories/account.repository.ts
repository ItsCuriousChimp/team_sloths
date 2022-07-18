import { PrismaClient } from '@prisma/client';
import AccountModel from '../common/models/account.model';

const prisma: PrismaClient = new PrismaClient();

export default class AccountRepository {
  private async isUserNamePresent(userName : String) {
    const record = await prisma.account.findFirst({
      where: {
        username: String(userName),
      },
    });

    return record;
  }

  private async isAccountPresent(accountId : String) {
    const record = await prisma.account.findFirst({
      where: {
        id: String(accountId),
      },
    });

    return record;
  }

  public async createAccountWithoutUserId(
    userName : String,
    passwordHash : String,
  ) : Promise<String> {
    if (await this.isUserNamePresent(userName) === null) {
      const account = await prisma.account.create({
        data: {
          username: String(userName),
          passwordHash: String(passwordHash),
        },
      });

      return account.id;
    }
    // User with this username already exists
    return '';
  }

  public async addUserIdToAccount(
    userId: String,
    accountId: String,
  ) {
    if (await this.isAccountPresent(accountId) === null) {
      return new AccountModel('', '', '');
    }

    const account = await prisma.account.update({
      where: {
        id: String(accountId),
      },
      data: {
        userId: String(userId),
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
