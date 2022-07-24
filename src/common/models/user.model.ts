export default class UserModel {
  id : String;
  name : String;
  email : String;
  city : String | undefined;
  loggedInAtUtc : Date;
  cityId : String | undefined;
  phoneNumber : String | undefined;

  constructor(
    id : String,
    name: String,
    email: String,
    // city:String,
    loggedInAtUtc : Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    // this.city = city;
    this.loggedInAtUtc = loggedInAtUtc;
  }
}
