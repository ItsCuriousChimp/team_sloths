import BookedSeatModel from './bookedSeat.model';

export default class ShowModel {
  id : String;

  screenId : String;

  movieId : String;

  showStartTimeInUtc : Date;

  showEndTimeInUtc : Date;

  availableUntilUtc : Date;

  totalSeats : Number;

  availableSeats : Number;

  bookedSeat : BookedSeatModel[];

  availabilityStatus : String;

  constructor(
    id : String,
    screenId : String,
    movieId : String,
    showStartTimeInUtc : Date,
    showEndTimeInUtc : Date,
    availableUntilUtc : Date,
    bookedSeat : BookedSeatModel[] = [],
    totalSeats : Number = -1,
    availableSeats : Number = -1,
    availabilityStatus : String = '',
  ) {
    this.id = id;
    this.screenId = screenId;
    this.movieId = movieId;
    this.showStartTimeInUtc = showStartTimeInUtc;
    this.showEndTimeInUtc = showEndTimeInUtc;
    this.availableUntilUtc = availableUntilUtc;
    this.bookedSeat = bookedSeat;
    this.totalSeats = totalSeats;
    this.availableSeats = availableSeats;
    this.availabilityStatus = availabilityStatus;
  }
}
