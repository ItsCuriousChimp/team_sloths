export default class UserModel {
  id : String;
  name : String;
  email : String;
  loggedInAtUtc : Date;
  cityId : String | undefined;
  phoneNumber : String | undefined;
  city : String |undefined;

  constructor(
    id : String,
    name: String,
    email: String,
    loggedInAtUtc : Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.loggedInAtUtc = loggedInAtUtc;
  }
}
