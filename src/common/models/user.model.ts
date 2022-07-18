export default class UserModel {
  id: string;
  name: string;
  email: string;
  loggedInAtUtc: Date;
  cityId: string | undefined;
  phoneNumber: string | undefined;
  constructor(
    id: string,
    name: string,
    email: string,
    loggedInAtUtc: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.loggedInAtUtc = loggedInAtUtc;
  }
}
