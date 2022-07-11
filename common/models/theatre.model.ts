export default class TheatreModel {
  id: String;

  name: String;

  constructor(theatreId: String, theatreName: String) {
    this.id = theatreId;
    this.name = theatreName;
  }
}
