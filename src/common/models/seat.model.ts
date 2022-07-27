import { AutoMap } from '@automapper/classes';
import BookedSeatModel from './booked-seat.model';

export default class SeatModel {
  @AutoMap()
    id : string;
  @AutoMap()
    screenId : string;
  @AutoMap()
    seatNumber : Number;
  @AutoMap()
    bookedSeat : BookedSeatModel[] | undefined;

  constructor(
    id : string,
    screenId : string,
    seatNumber : Number,
  ) {
    this.id = id;
    this.screenId = screenId;
    this.seatNumber = seatNumber;
  }
}
