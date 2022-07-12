import BookedSeatModel from './bookedSeat.model';

export default class SeatModel {
  id : String;

  screenId : String;

  seatNumber : Number;

  bookedSeat : BookedSeatModel[];

  constructor(
    id : String,
    screenId : String,
    seatNumber : Number,
    bookedSeat : BookedSeatModel[] = [],
  ) {
    this.id = id;
    this.screenId = screenId;
    this.seatNumber = seatNumber;
    this.bookedSeat = bookedSeat;
  }
}
