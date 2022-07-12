export default class BookedSeatModel {
  id : String;

  seatId : String;

  showId : String;

  bookingId : Date;

  constructor(
    id : String,
    seatId : String,
    showId : String,
    bookingId : Date,
  ) {
    this.id = id;
    this.seatId = seatId;
    this.showId = showId;
    this.bookingId = bookingId;
  }
}
