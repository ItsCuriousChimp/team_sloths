import HashHelper from '../common/helpers/hash.helper';
import JWTHelper from '../common/helpers/jwt.helper';
import AccountModel from '../common/models/account.model';
import AccountRepository from '../repositories/account.repository';
import UserRepository from '../repositories/user.repository';

import AccessTokenModel from '../common/models/access-token.model';

export default class AccountService {
  public async signupUser(
    name : string,
    email : string,
    password : string,
  ) : Promise<string> {
    const accountRepositoryInstance : AccountRepository = new AccountRepository();

    const userAccount : AccountModel =
    await accountRepositoryInstance.getAccountByEmail(email);

    if (userAccount.username !== '') {
      return '';
    }

    const userRepositoryInstance = new UserRepository();
    const userId : string = await userRepositoryInstance.createUser(name, email);

    const passwordHash : string = await new HashHelper().hashString(password);
    const accountModel : AccountModel =
    await accountRepositoryInstance.createUserAccount(email, passwordHash, userId);

    const accessTokenModel : AccessTokenModel =
    new AccessTokenModel(
      String(accountModel.userId),
    );

    const accessToken : string = new JWTHelper().generateJWTToken(accessTokenModel);

    return accessToken;
  }

  public async loginUser(
    email : string,
    password : string,
  ) : Promise<string> {
    const accountRepositoryInstance : AccountRepository = new AccountRepository();

    const userAccount : AccountModel =
    await accountRepositoryInstance.getAccountByEmail(email);
    if (userAccount.username === '') {
      return '';
    }

    const isPasswordSame : Boolean =
    await new HashHelper().isPasswordSame(password, userAccount.passwordHash);
    if (!isPasswordSame) {
      return '';
    }

    const accessTokenModel : AccessTokenModel =
    new AccessTokenModel(
      String(userAccount.userId),
    );

    const accessToken : string = new JWTHelper().generateJWTToken(accessTokenModel);

    return accessToken;
  }
}
