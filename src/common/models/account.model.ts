import { AutoMap } from '@automapper/classes';

export default class AccountModel {
  @AutoMap()
    id! : string;
  @AutoMap()
    userId! : string;
  @AutoMap()
    username! : string;
  @AutoMap()
    passwordHash! : string;

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
