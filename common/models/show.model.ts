import BookedSeatModel from './bookedSeat.model';

export default class ShowModel {
  id : String;

  screenId : String;

  movieId : String;

  showStartTimeInUtc : Date;

  showEndTimeInUtc : Date;

  availableUntilUtc : Date;

  bookedSeat : BookedSeatModel[];

  constructor(
    id : String,
    screenId : String,
    movieId : String,
    showStartTimeInUtc : Date,
    showEndTimeInUtc : Date,
    availableUntilUtc : Date,
    bookedSeat : BookedSeatModel[] = [],
  ) {
    this.id = id;
    this.screenId = screenId;
    this.movieId = movieId;
    this.showStartTimeInUtc = showStartTimeInUtc;
    this.showEndTimeInUtc = showEndTimeInUtc;
    this.availableUntilUtc = availableUntilUtc;
    this.bookedSeat = bookedSeat;
  }
}
