import HashHelper from '../common/helpers/hash.helper';
import JWTHelper from '../common/helpers/jwt.helper';
import AccessTokenModel from '../common/models/access-token.model';
import AccountModel from '../common/models/account.model';
import AccountRepository from '../repositories/account.repository';
import UserRepository from '../repositories/user.repository';

export default class AccountService {
  public async signUpUserUsingEmailAndPassword(
    name : String,
    email : String,
    password : String,
  ) : Promise<String> {
    // Hash the password string
    const passwordHash : String = await new HashHelper().hashString(password);

    const accountRepositoryInstance = new AccountRepository();

    const accountByUsername : AccountModel =
    await accountRepositoryInstance.getAccountByUsername(email);

    // if account with this username already exists
    if (accountByUsername.id !== '') {
      return '';
    }

    // Create account without user id
    const accountId : String =
    await accountRepositoryInstance.createAccountWithoutUserId(email, passwordHash);

    // Create user
    const userRepositoryInstance = new UserRepository();
    const userId : String = await userRepositoryInstance.createUser(name, email);

    // Add user id to account
    const accountModel : AccountModel =
    await accountRepositoryInstance.updateUserIdInAccount(userId, accountId);

    // Initialize AccessTokenModel
    const accessTokenModel : AccessTokenModel =
    new AccessTokenModel(
      String(accountModel.userId),
    );

    // Add jwt token to AccessTokenModel
    const accessToken : String = new JWTHelper().generateJWTToken(accessTokenModel);

    // return AccessTokenModel
    return accessToken;
  }
}
