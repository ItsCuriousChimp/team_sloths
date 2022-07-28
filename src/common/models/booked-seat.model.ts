export default class BookedSeatModel {
  id : String;
  seatId : String;
  showId : String;
  bookingId : String;

  constructor(
    id : String,
    seatId : String,
    showId : String,
    bookingId : String,
  ) {
    this.id = id;
    this.seatId = seatId;
    this.showId = showId;
    this.bookingId = bookingId;
  }
}
