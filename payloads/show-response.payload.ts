import BookedSeatModel from '../common/models/bookedSeat.model';

export default class ShowResponsePayload {
  id : String = ' ';

  screenId : String = ' ';

  movieId : String = ' ';

  showStartTimeInUtc : Date = new Date();

  showEndTimeInUtc : Date = new Date();

  availableUntilUtc : Date = new Date();

  bookedSeat : BookedSeatModel[] = [];
}
