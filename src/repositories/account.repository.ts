import { PrismaClient } from '@prisma/client';
import AccountModel from '../common/models/account.model';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const prisma: PrismaClient = new PrismaClient();

export default class AccountRepository {
  public async createAccountForUser(
    userId : String,
    userName : String,
    password : String,
  ) : Promise<AccountModel> {
    const accountExists = await prisma.account.findFirst({
      where: {
        username: String(userName),
      },
    });
    if (accountExists === null) {
      const passwordUsingBcrypt = await
      bcrypt.genSalt(12).then((salt : any) => bcrypt.hash(password, salt));
      const account = await prisma.account.create({
        data: {
          userId: String(userId),
          username: String(userName),
          passwordHash: String(passwordUsingBcrypt),
        },
      });
      const accountModel = new AccountModel(
        account.id,
        account.userId,
        account.username,
        account.passwordHash,
      );
      const token = jwt.sign(JSON.stringify(accountModel), process.env.ACCESS_TOKEN_SECRET);
      accountModel.jwtToken = token;
      return accountModel;
    }
    // User with this username already exists
    return new AccountModel('', '', '', '');
  }
}
