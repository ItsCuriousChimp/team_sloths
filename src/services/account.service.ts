import HashHelper from '../common/helpers/hash.helper';
import JWTHelper from '../common/helpers/jwt.helper';
import AccessTokenModel from '../common/models/access-token.model';
import AccountModel from '../common/models/account.model';
import AccountRepository from '../repositories/account.repository';
import TransactionsDataStorage from '../repositories/transactions-data-storage.repository';
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

    // if account with this username already exists
    if (accountByUsername !== null) {
      return '';
    }

    // Hash the password string
    const passwordHash : string = await new HashHelper().hashString(password);

    const transactionDataStorage : TransactionsDataStorage = new TransactionsDataStorage();

    const accountModelOfNewUser : AccountModel =
    await transactionDataStorage.executeInTransaction(async (dataStorageInstance : any) => {
      const accountId : string =
      await new AccountRepository().createAccountWithoutUserId(dataStorageInstance, name, email);

      const userId : string =
      await new UserRepository().createUser(dataStorageInstance, email, passwordHash);

      const accountModel : AccountModel =
      await new AccountRepository().updateUserIdInAccount(dataStorageInstance, userId, accountId);

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

    // if account with this username does not exists
    if (accountByUsername === null) {
      return '';
    }

    // Check if entered password matches with the hashed password in database
    const isPasswordSame : Boolean =
    await new HashHelper().isHashValueSame(password, accountByUsername.passwordHash);

    // If password is incorrect
    if (!isPasswordSame) {
      return '';
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
