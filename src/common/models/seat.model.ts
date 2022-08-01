import BookedSeatModel from './booked-seat.model';

export default class SeatModel {
  id : string;
  screenId : string;
  seatNumber : Number;
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
