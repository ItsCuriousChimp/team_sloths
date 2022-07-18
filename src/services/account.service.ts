import AccountModel from '../common/models/account.model';
import UserModel from '../common/models/user.model';
import AccountRepository from '../repositories/account.repository';
import UserRepository from '../repositories/user.repository';

export default class AccountService {
  public async signUpUserUsingEmailAndPassword(
    name : String,
    email : String,
    password : String,
  ) : Promise<AccountModel> {
    const userRepositoryInstance = new UserRepository();
    const userModel : UserModel = await userRepositoryInstance.createUser(name, email);
    if (userModel.id === '') {
      return new AccountModel('', '', '', '');
    }
    const accountRepositoryInstance = new AccountRepository();
    const accountModel : AccountModel =
    await accountRepositoryInstance.createAccountForUser(userModel.id, email, password);
    return accountModel;
  }
}
