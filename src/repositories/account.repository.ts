import { PrismaClient } from '@prisma/client';
import AccountModel from '../common/models/account.model';

const prisma: PrismaClient = new PrismaClient();

export default class AccountRepository {
  public async getAccountByEmail(
    username : string,
  ) : Promise<boolean> {
    const record = await prisma.account.findFirst({
      where: {
        username,
      },
    });

    return !(record === null);
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
