import { account, Prisma, PrismaClient } from '@prisma/client';
import AccountModel from '../common/models/account.model';

const prisma: PrismaClient = new PrismaClient();

export default class AccountRepository {
  public async getAccountByUsername(
    username : string,
  ) : Promise<AccountModel | null> {
    const record : account | null = await prisma.account.findFirst({
      where: {
        username,
      },
    });

    if (record === null) {
      return null;
    }
    const accountModel : AccountModel = this.makeAccountModel(record);
    return accountModel;
  }

  public async createAccountWithoutUserId(
    prismaInstance : Prisma.TransactionClient,
    username : string,
    passwordHash : string,
  ) : Promise<string> {
    const record = await prismaInstance.account.create({
      data: {
        username,
        passwordHash,
      },
    });

    return record.id;
  }

  public async updateUserIdInAccount(
    prismaInstance : Prisma.TransactionClient,
    userId: string,
    accountId: string,
  ) : Promise<AccountModel> {
    const record = await prismaInstance.account.update({
      where: {
        id: accountId,
      },
      data: {
        userId,
      },
    });

    const accountModel : AccountModel = this.makeAccountModel(record);

    return accountModel;
  }

  private makeAccountModel(accountData :any) : AccountModel {
    const accountModel : AccountModel = new AccountModel(
      accountData.id,
      accountData.username,
      accountData.passwordHash,
    );
    if (accountData.userId) {
      accountModel.userId = accountData.userId;
    }
    return accountModel;
  }
}
