export default class AccessTokenModel {
  id : String;
  username : String;
  passwordHash : String;

  constructor(
    id : String,
    username : String,
    passwordHash : String,
  ) {
    this.id = id;
    this.username = username;
    this.passwordHash = passwordHash;
  }
}
