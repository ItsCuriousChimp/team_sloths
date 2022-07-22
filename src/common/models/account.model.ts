export default class AccountModel {
  id: string;
  username: string;
  passwordHash: string;
  user: any;
  constructor(id: string, username: string, passwordHash: string, user: any) {
    this.id = id;
    this.username = username;
    this.passwordHash = passwordHash;
    this.user = user;
  }
}
