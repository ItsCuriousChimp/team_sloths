export default class BookedSeatModel {
  id : string;
  seatId : string;
  showId : string;
  bookingId : string;

  constructor(
    id : string,
    seatId : string,
    showId : string,
    bookingId : string,
  ) {
    this.id = id;
    this.seatId = seatId;
    this.showId = showId;
    this.bookingId = bookingId;
  }
}
