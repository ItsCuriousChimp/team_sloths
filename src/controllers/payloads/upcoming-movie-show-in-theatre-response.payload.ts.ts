export default class UpcomingMovieShowInTheatreResponsePayload {
  id : string | undefined;
  screenId : string | undefined;
  movieId : string | undefined;
  showStartTimeInUtc : Date | undefined;
  showEndTimeInUtc : Date | undefined;
  availableUntilUtc : Date | undefined;
  totalSeats : Number | undefined;
  availableSeats : Number | undefined;
  availabilityStatus : string | undefined;
}
