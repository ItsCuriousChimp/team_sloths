import { AutoMap } from '@automapper/classes';

export default class AccessTokenModel {
  @AutoMap()
    userId : String;

  constructor(
    userId : String,
  ) {
    this.userId = userId;
  }
}
