import { AutoMap } from '@automapper/classes';

export default class TheatreResponsePayload {
  @AutoMap()
    id!: string;
  @AutoMap()
    name!: string;
}
