export default class UpcomingMovieShowInTheatreResponsePayload {
  id : String = ' ';

  screenId : String = ' ';

  movieId : String = ' ';

  showStartTimeInUtc : Date = new Date();

  showEndTimeInUtc : Date = new Date();

  availableUntilUtc : Date = new Date();

  totalSeats : Number = 0;

  availableSeats : Number = 0;

  availabilityStatus : String = ' ';
}
