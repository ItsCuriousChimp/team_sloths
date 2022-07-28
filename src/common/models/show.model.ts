import BookedSeatModel from './booked-seat.model';

export default class ShowModel {
  id : String;
  screenId : String;
  movieId : String;
  showStartTimeInUtc : Date;
  showEndTimeInUtc : Date;
  availableUntilUtc : Date;
  totalSeats : Number | undefined;
  availableSeats : Number | undefined;
  bookedSeat : BookedSeatModel[] | undefined;
  availabilityStatus : String | undefined;

  constructor(
    id : String,
    screenId : String,
    movieId : String,
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
