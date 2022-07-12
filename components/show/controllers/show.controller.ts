import ShowModel from '../../../common/models/show.model';
import ShowResponsePayload from '../../../payloads/show-response.payload';
import ShowServices from '../services/show.service';

export default class ShowController {
  public async getShowFromTreaterAndMovie(theatreId : String, movieId : String) :
  Promise<ShowResponsePayload[]> {
    const showServices : ShowServices = new ShowServices();
    const showList : ShowModel[] = await showServices.getShow(theatreId, movieId);
    const payload : ShowResponsePayload[] = [];
    showList.forEach((show) => {
      const element : ShowResponsePayload = new ShowResponsePayload();
      element.id = show.id;
      element.screenId = show.screenId;
      element.movieId = show.movieId;
      element.showStartTimeInUtc = show.showStartTimeInUtc;
      element.showEndTimeInUtc = show.showEndTimeInUtc;
      element.availableUntilUtc = show.availableUntilUtc;
      payload.push(element);
    });
    return payload;
  }

  public async getBookedSeatFromTheatreAndMovie(theatreId : String, movieId : String) :
  Promise<ShowResponsePayload[]> {
    const showServices = new ShowServices();
    const showList : ShowModel[] = await showServices.getBookedSeat(theatreId, movieId);
    const payload : ShowResponsePayload[] = [];
    showList.forEach((show) => {
      const element : ShowResponsePayload = new ShowResponsePayload();
      element.id = show.id;
      element.screenId = show.screenId;
      element.movieId = show.movieId;
      element.showStartTimeInUtc = show.showStartTimeInUtc;
      element.showEndTimeInUtc = show.showEndTimeInUtc;
      element.availableUntilUtc = show.availableUntilUtc;
      element.bookedSeat = show.bookedSeat;
      payload.push(element);
    });
    return payload;
  }
}
