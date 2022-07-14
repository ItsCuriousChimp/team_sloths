export default class UpcomingMovieShowInTheatreResponsePayload {
  id : String | undefined;
  screenId : String | undefined;
  movieId : String | undefined;
  showStartTimeInUtc : Date | undefined;
  showEndTimeInUtc : Date | undefined;
  availableUntilUtc : Date | undefined;
  totalSeats : Number | undefined;
  availableSeats : Number | undefined;
  availabilityStatus : String | undefined;
}
