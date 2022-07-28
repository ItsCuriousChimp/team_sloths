import { AutoMap } from '@automapper/classes';

export default class UserModel {
  @AutoMap()
    id! : string;
  @AutoMap()
    name!: string;
  @AutoMap()
    email! : string;
  loggedInAtUtc : Date;
  @AutoMap()
    phoneNumber! : string;
  @AutoMap()
    cityId! : string;
  @AutoMap()
    city! : string;

  constructor(
    id : string,
    name: string,
    email: string,
    loggedInAtUtc : Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.loggedInAtUtc = loggedInAtUtc;
  }
}
