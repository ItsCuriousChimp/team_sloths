import BookedSeatModel from './booked-seat.model';

export default class SeatModel {
  id : String;
  screenId : String;
  seatNumber : Number;
  bookedSeat : BookedSeatModel[] | undefined;

  constructor(
    id : String,
    screenId : String,
    seatNumber : Number,
  ) {
    this.id = id;
    this.screenId = screenId;
    this.seatNumber = seatNumber;
  }
}
