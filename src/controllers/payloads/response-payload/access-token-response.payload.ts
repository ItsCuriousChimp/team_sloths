import { AutoMap } from '@automapper/classes';

export default class AccessTokenResponsePayload {
  @AutoMap()
    accessToken! : string;
}
