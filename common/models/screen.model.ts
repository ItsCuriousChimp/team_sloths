import SeatModel from './seat.model';
import ShowModel from './show.model';

export default class ScreenModel {
  id : String;
  theatreId : String;
  screenNumber : Number;
  show : ShowModel[] | undefined;
  seat : SeatModel[] | undefined;

  constructor(
    id : String,
    theatreId : String,
    screenNumber : Number,
  ) {
    this.id = id;
    this.theatreId = theatreId;
    this.screenNumber = screenNumber;
  }
}
