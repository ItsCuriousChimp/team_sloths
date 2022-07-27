import { AutoMap } from '@automapper/classes';

export default class CityModel {
  @AutoMap()
    id : string;
  @AutoMap()
    name : string;

  constructor(
    id: string,
    name: string,
  ) {
    this.id = id;
    this.name = name;
  }
}
