import UserRepository from '../repositories/user.repository';
import AccountRepository from '../repositories/account.repository';
import JwtTokenHelper from '../common/helpers/jwtToken.helper';
import HashHelper from '../common/helpers/hash.helper';
import AccessTokenModel from '../common/models/accessToken.model';

export default class AccountService {
  public async signupUser(name: string, email: string, password: string) {
    const accountRepository = new AccountRepository();
    const account = await accountRepository.getAccount(email);
    if (account) {
      return '';
    }
    const passwordHash = await new HashHelper().getPasswordHash(password);
    const newAccount = await accountRepository.createAccount(email, passwordHash);
    const userRepository = new UserRepository();
    const newUser = await userRepository.createUser(name, email);
    accountRepository.setUserId(newUser.id, newAccount.id);
    const response = await new JwtTokenHelper().generateToken(new AccessTokenModel(newAccount.id));
    return response;
  }
}
