import { PrismaClient } from '@prisma/client';
import AccountModel from '../common/models/account.model';

const prisma: PrismaClient = new PrismaClient();

export default class AccountRepository {
  public async getAccountByEmail(
    username : string,
  ) : Promise<AccountModel> {
    const record = await prisma.account.findFirst({
      where: {
        username,
      },
    });

    if (record) {
      return new AccountModel(record.id, record.username, record.passwordHash);
    }
    return new AccountModel('', '', '');
  }

  public async createUserAccount(
    username : string,
    passwordHash : string,
    userId : string,
  ) : Promise<AccountModel> {
    const account = await prisma.account.create({
      data: {
        username,
        passwordHash,
        userId,
      },
    });

    const accountModel: AccountModel = new AccountModel(
      account.id,
      account.username,
      account.passwordHash,
    );
    return accountModel;
  }
}
