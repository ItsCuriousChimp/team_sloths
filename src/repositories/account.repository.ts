import { account, PrismaClient } from '@prisma/client';
// import { createMap, forMember, mapFrom } from '@automapper/core';
// import { mapper } from '../common/mapper/mapper';
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
    const result = new AccountModel(
      record.id,
      record.username,
      record.passwordHash,
    );
    result.userId = String(record.userId);
    return result;
  }

  public async createAccountWithoutUserId(
    username : string,
    passwordHash : string,
  ) : Promise<string> {
    const record = await prisma.account.create({
      data: {
        username,
        passwordHash,
      },
    });

    return record.id;
  }

  public async updateUserIdInAccount(
    userId: string,
    accountId: string,
  ) : Promise<AccountModel> {
    const record = await prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        userId,
      },
    });

    const accountModel = new AccountModel(
      record.id,
      record.username,
      record.passwordHash,
    );
    accountModel.userId = String(record.userId);

    return accountModel;
  }
}
