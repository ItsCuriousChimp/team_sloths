import { AutoMap } from '@automapper/classes';

export default class UpcomingMovieShowInTheatreResponsePayload {
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
}
