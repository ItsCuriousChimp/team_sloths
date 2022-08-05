import { AutoMap } from '@automapper/classes';

export default class MovieModel {
  @AutoMap()
    id!: string;
  @AutoMap()
    name!: string;
  @AutoMap()
    language!: string;
  constructor(id: string, name: string, language: string) {
    this.id = id;
    this.name = name;
    this.language = language;
  }
}
