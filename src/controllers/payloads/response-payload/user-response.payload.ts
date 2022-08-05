import { AutoMap } from '@automapper/classes';

export default class UserResponsePayload {
  @AutoMap()
    id!: string;
  @AutoMap()
    name! : string;
  @AutoMap()
    email!: string;
  @AutoMap()
    phoneNumber! : string;
  @AutoMap()
    cityId! : string;
  @AutoMap()
    city! : string;
}
