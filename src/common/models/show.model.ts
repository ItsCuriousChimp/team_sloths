import { AutoMap } from '@automapper/classes';
import BookedSeatModel from './booked-seat.model';

export default class ShowModel {
  @AutoMap()
    id! : string;
  @AutoMap()
    screenId! : string;
  @AutoMap()
    movieId! : string;
  @AutoMap()
    showStartTimeInUtc! : Date;
  @AutoMap()
    showEndTimeInUtc! : Date;
  @AutoMap()
    availableUntilUtc! : Date;
  @AutoMap()
    totalSeats! : Number;
  @AutoMap()
    availableSeats! : Number;
  @AutoMap()
    availabilityStatus! : string;
  bookedSeat : BookedSeatModel[] | undefined;

  constructor(
    id : string,
    screenId : string,
    movieId : string,
    showStartTimeInUtc : Date,
    showEndTimeInUtc : Date,
    availableUntilUtc : Date,
  ) {
    this.id = id;
    this.screenId = screenId;
    this.movieId = movieId;
    this.showStartTimeInUtc = showStartTimeInUtc;
    this.showEndTimeInUtc = showEndTimeInUtc;
    this.availableUntilUtc = availableUntilUtc;
  }
}
