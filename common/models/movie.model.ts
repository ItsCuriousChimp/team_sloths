export default class MovieModel {
  id: String;
  name: String;
  language: String;
  constructor(id: String, name: String, language: String) {
    this.id = id;
    this.name = name;
    this.language = language;
  }
}
