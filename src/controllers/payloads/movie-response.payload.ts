import { AutoMap } from '@automapper/classes';

export default class MovieResponsePayload {
  @AutoMap()
    id!: string;
  @AutoMap()
    name!: string;
  @AutoMap()
    language!: string;
}
