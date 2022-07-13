import SeatModel from './seat.model';
import ShowModel from './show.model';

export default class ScreenModel {
  id : String;

  theatreId : String;

  screenNumber : Number;

  show : ShowModel[];

  seat : SeatModel[];

  constructor(
    id : String,
    theatreId : String,
    screenNumber : Number,
    show : ShowModel[] = [],
    seat : SeatModel[] = [],
  ) {
    this.id = id;
    this.theatreId = theatreId;
    this.screenNumber = screenNumber;
    this.show = show;
    this.seat = seat;
  }
}
