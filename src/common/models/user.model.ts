import { AutoMap } from '@automapper/classes';

export default class UserModel {
  @AutoMap()
    id : string;
  @AutoMap()
    name : string;
  @AutoMap()
    email : string;
  @AutoMap()
    loggedInAtUtc : Date;
  @AutoMap()
    cityId : string | undefined;
  @AutoMap()
    phoneNumber : string | undefined;
  @AutoMap()
    city : string |undefined;

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
