import { AutoMap } from '@automapper/classes';
import SeatModel from './seat.model';
import ShowModel from './show.model';

export default class ScreenModel {
  @AutoMap()
    id : string;
  @AutoMap()
    theatreId : string;
  @AutoMap()
    screenNumber : Number;
  @AutoMap()
    show : ShowModel[] | undefined;
  @AutoMap()
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
