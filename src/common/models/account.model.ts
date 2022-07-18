export default class AccountModel {
  id : String;
  userId : String;
  username : String;
  passwordHash : String;
  jwtToken : String | undefined;

  constructor(
    id : String,
    userId : String,
    username : String,
    passwordHash : String,
  ) {
    this.id = id;
    this.userId = userId;
    this.username = username;
    this.passwordHash = passwordHash;
  }
}
