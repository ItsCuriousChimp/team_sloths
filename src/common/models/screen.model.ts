import SeatModel from './seat.model';
import ShowModel from './show.model';

export default class ScreenModel {
  id : string;
  theatreId : string;
  screenNumber : Number;
  show : ShowModel[] | undefined;
  seat : SeatModel[] | undefined;

  constructor(
    id : string,
    theatreId : string,
    screenNumber : Number,
  ) {
    this.id = id;
    this.theatreId = theatreId;
    this.screenNumber = screenNumber;
  }
}
