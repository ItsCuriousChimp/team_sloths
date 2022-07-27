import { AutoMap } from '@automapper/classes';

export default class BookedSeatModel {
  @AutoMap()
    id : string;
  @AutoMap()
    seatId : string;
  @AutoMap()
    showId : string;
  @AutoMap()
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
