import { account } from '@prisma/client';
import ArgumentValidationError from '../common/errors/argument-validation.error';
import AccountModel from '../common/models/account.model';
import BaseRepository from './base.repository';

export default class AccountRepository extends BaseRepository {
  public async getAccountByUsername(
    username : string,
  ) : Promise<AccountModel> {
    const record : account | null = await this.dsClient.account.findFirst({
      where: {
        username,
      },
    });

    const accountModel : AccountModel = this.makeAccountModel(record);
    return accountModel;
  }

  public async createAccountWithoutUserId(
    username : string,
    passwordHash : string,
  ) : Promise<string> {
    const record = await this.dsClient.account.create({
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
    const record = await this.dsClient.account.update({
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
    if (accountData === null) {
      throw new ArgumentValidationError('Invalid user id');
    }
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
