import HashHelper from '../common/helpers/hash.helper';
import JWTHelper from '../common/helpers/jwt.helper';
import AccessTokenModel from '../common/models/access-token.model';
import AccountModel from '../common/models/account.model';
import AccountRepository from '../repositories/account.repository';
import UserRepository from '../repositories/user.repository';
import DataStore from '../repositories/data.store';
import ArgumentValidationError from '../common/errors/argument-validation.error';

export default class AccountService {
  public async signUpUserUsingEmailAndPassword(
    name: string,
    email: string,
    password: string,
  ): Promise<string> {
    const transactionMiddleware = new DataStore();
    const res =
    await transactionMiddleware.transactionMiddleware(async (dataStorageInstance: any) => {
      const accountRepositoryInstance: AccountRepository =
      new AccountRepository(dataStorageInstance);

      const accountByUsername: AccountModel | null =
        await accountRepositoryInstance.getAccountByUsername(email);

      // if account with this username already exists
      if (accountByUsername !== null) {
        throw new ArgumentValidationError('Account Already Exists');
      }

      // Hash the password string
      const passwordHash: string = await new HashHelper().hashString(password);

      // Create account without user id
      const accountId: string =
        await accountRepositoryInstance.createAccountWithoutUserId(email, passwordHash);

      // Create user
      const userRepositoryInstance = new UserRepository(dataStorageInstance);
      const userId: string = await userRepositoryInstance.createUser(name, email);

      // Update user id in account
      const accountModel: AccountModel =
        await accountRepositoryInstance.updateUserIdInAccount(userId, accountId);

      // Initialize AccessTokenModel
      const accessTokenModel: AccessTokenModel =
        new AccessTokenModel(
          String(accountModel.userId),
        );

      // Create jwt token from AccessTokenModel
      const accessToken: string = new JWTHelper().generateJWTToken(accessTokenModel);

      // return AccessTokenModel
      return accessToken;
    });
    return res;
  }

  public async loginUserUsingEmailAndPassword(email: string, password: string): Promise<string> {
    const accountRepositoryInstance: AccountRepository = new AccountRepository();

    const accountByUsername: AccountModel | null =
        await accountRepositoryInstance.getAccountByUsername(email);

    // if account with this username does not exists
    if (accountByUsername === null) {
      throw new ArgumentValidationError('Incorrect username or password');
    }

    // Check if entered password matches with the hashed password in database
    const isPasswordSame: Boolean =
        await new HashHelper().isHashValueSame(password, accountByUsername.passwordHash);

    // If password is incorrect
    if (!isPasswordSame) {
      throw new ArgumentValidationError('Incorrect username or password');
    }

    // Initialize AccessTokenModel
    const accessTokenModel: AccessTokenModel =
        new AccessTokenModel(
          String(accountByUsername.userId),
        );

    // Create jwt token from AccessTokenModel
    const accessToken: string = new JWTHelper().generateJWTToken(accessTokenModel);

    // return AccessTokenModel
    return accessToken;
  }
}
