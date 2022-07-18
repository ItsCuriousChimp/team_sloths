import UserRepository from '../repositories/user.repository';
import AccountRepository from '../repositories/account.repository';
import JwtTokenHelper from '../common/helpers/jwtToken.helper';
import BcryptHelper from '../common/helpers/bcrypt.helper';

export default class SignupService {
  public async signupUser(name: string, email: string, password: string) {
    const accountRepository = new AccountRepository();
    const account = await accountRepository.getAccount(email);
    let response: string = '';
    if (!account) {
      const passwordHash = await new BcryptHelper().getPasswordHash(password);
      const newAccount = await accountRepository.createAccount(email, passwordHash);
      const userRepository = new UserRepository();
      const newUser = await userRepository.createUser(name, email);
      accountRepository.setUserId(newUser.id, newAccount.id);
      response = await new JwtTokenHelper().generateToken(newAccount.id);
    }
    return response;
  }
}
