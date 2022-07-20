import UserRepository from '../repositories/user.repository';
import AccountRepository from '../repositories/account.repository';
import JwtTokenHelper from '../common/helpers/jwtToken.helper';
import HashHelper from '../common/helpers/hash.helper';
import AccessTokenModel from '../common/models/accessToken.model';
import AccountModel from '../common/models/account.model';
import UserModel from '../common/models/user.model';

export default class AccountService {
  public async signupUser(name: string, email: string, password: string): Promise<string> {
    const accountRepository: AccountRepository = new AccountRepository();
    const account: AccountModel | null = await accountRepository.getAccount(email);
    if (account) {
      return '';
    }
    const passwordHash: string = await new HashHelper().getHash(password);
    const newAccount: AccountModel = await accountRepository.createAccount(email, passwordHash);
    const userRepository: UserRepository = new UserRepository();
    const newUser: UserModel = await userRepository.createUser(name, email);
    accountRepository.setUserId(newUser.id, newAccount.id);
    const jwtTokenHelper: JwtTokenHelper = new JwtTokenHelper();
    const accessToken: AccessTokenModel = new AccessTokenModel(newAccount.id);
    const response: string = await jwtTokenHelper.generateToken(accessToken);
    return response;
  }

  public async loginUser(email: string, password: string): Promise<string> {
    const account: AccountModel | null = await new AccountRepository().getAccount(email);
    let response: string = '';
    if (account) {
      const hashHelper: HashHelper = new HashHelper();
      const isMatched: boolean = await hashHelper.validateHash(password, account.passwordHash);
      if (isMatched) {
        const accessToken: AccessTokenModel = new AccessTokenModel(String(account.id));
        response = await new JwtTokenHelper().generateToken(accessToken);
      } else {
        response = '401';
      }
    } else {
      response = '401';
    }
    return response;
  }
}
