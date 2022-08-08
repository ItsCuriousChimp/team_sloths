import ArgumentValidationError from '../common/errors/argument-validation.error';
import UnauthorizedError from '../common/errors/unauthorized.error';
import HashHelper from '../common/helpers/hash.helper';
import JWTHelper from '../common/helpers/jwt.helper';
import AccessTokenModel from '../common/models/access-token.model';
import AccountModel from '../common/models/account.model';
import AccountRepository from '../repositories/account.repository';
import DataStore from '../repositories/data.store';
import UserRepository from '../repositories/user.repository';

export default class AccountService {
  public async signUpUserUsingEmailAndPassword(
    name : string,
    email : string,
    password : string,
  ) : Promise<string> {
    const accountRepositoryInstance : AccountRepository = new AccountRepository();

    const accountByUsername : AccountModel | null =
    await accountRepositoryInstance.getAccountByUsername(email);
    // if account with this username already exists will throw error
    if (accountByUsername !== null) {
      throw new ArgumentValidationError('Account with this username already exists');
    }

    // Hash the password string
    const passwordHash : string = await new HashHelper().hashString(password);

    const transactionDataStorage : DataStore = new DataStore();

    // run the below commands in transaction either all succeed or all fail
    const accountModelOfNewUser : AccountModel =
    await transactionDataStorage.executeInTransaction(async (dataStoreInstance : any) => {
      const accountRepositoryInstanceForTransactions : AccountRepository =
      new AccountRepository(dataStoreInstance);
      // make account without user id
      const accountId : string =
      await accountRepositoryInstanceForTransactions
        .createAccountWithoutUserId(email, passwordHash);
      // make user
      const userId : string =
      await new UserRepository(dataStoreInstance).createUser(name, email);
      // add user id to account
      const accountModel : AccountModel =
      await accountRepositoryInstanceForTransactions.updateUserIdInAccount(userId, accountId);

      return accountModel;
    });

    // Initialize AccessTokenModel
    const accessTokenModel : AccessTokenModel =
    new AccessTokenModel(
      String(accountModelOfNewUser.userId),
    );

    // Create jwt token from AccessTokenModel
    const accessToken : string = new JWTHelper().generateJWTToken(accessTokenModel);

    // return AccessTokenModel
    return accessToken;
  }

  public async loginUserUsingEmailAndPassword(email : string, password: string) : Promise<string> {
    const accountRepositoryInstance : AccountRepository = new AccountRepository();

    const accountByUsername : AccountModel | null =
    await accountRepositoryInstance.getAccountByUsername(email);

    if (accountByUsername === null) {
      throw new ArgumentValidationError('Account with this username already exists');
    }

    // Check if entered password matches with the hashed password in database
    const isPasswordSame : Boolean =
    await new HashHelper().isHashValueSame(password, accountByUsername.passwordHash);

    // If password is incorrect
    if (!isPasswordSame) {
      throw new UnauthorizedError('Invalid username or password');
    }

    // Initialize AccessTokenModel
    const accessTokenModel : AccessTokenModel =
    new AccessTokenModel(
      String(accountByUsername.userId),
    );

    // Create jwt token from AccessTokenModel
    const accessToken : string = new JWTHelper().generateJWTToken(accessTokenModel);

    // return AccessTokenModel
    return accessToken;
  }
}
