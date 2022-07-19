import { PrismaClient } from '@prisma/client';
import AccountModel from '../common/models/account.model';

const prisma: PrismaClient = new PrismaClient();

export default class AccountRepository {
  public async getAccountByUsername(
    userName : String,
  ) : Promise<AccountModel> {
    const record = await prisma.account.findFirst({
      where: {
        username: String(userName),
      },
    });

    if (record === null) {
      return new AccountModel('', '', '');
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
    username : String,
    passwordHash : String,
  ) : Promise<String> {
    const account = await prisma.account.create({
      data: {
        username: String(username),
        passwordHash: String(passwordHash),
      },
    });

    return account.id;
  }

  public async updateUserIdInAccount(
    userId: String,
    accountId: String,
  ) : Promise<AccountModel> {
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
