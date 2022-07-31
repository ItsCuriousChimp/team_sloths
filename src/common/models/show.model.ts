import BookedSeatModel from './booked-seat.model';

export default class ShowModel {
  id : string;
  screenId : string;
  movieId : string;
  showStartTimeInUtc : Date;
  showEndTimeInUtc : Date;
  availableUntilUtc : Date;
  totalSeats : Number | undefined;
  availableSeats : Number | undefined;
  bookedSeat : BookedSeatModel[] | undefined;
  availabilityStatus : string | undefined;

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
