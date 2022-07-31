export default class AccountModel {
  id : string;
  userId : string | undefined;
  username : string;
  passwordHash : string;

  constructor(
    id : string,
    username : string,
    passwordHash : string,
  ) {
    this.id = id;
    this.username = username;
    this.passwordHash = passwordHash;
  }
}
