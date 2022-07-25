export default class UserRequestPayload {
  name: String = '';
  phoneNumber: String = '';
  cityId: String = '';

  constructor(name: String, phoneNumber: String, cityId: String) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.cityId = cityId;
  }
}
