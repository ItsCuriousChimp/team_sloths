import { AutoMap } from '@automapper/classes';

export default class RequestContextModel {
  @AutoMap()
    userId! : string;
}
