import ShowResponsePayload from '../../../payloads/show-response.payload';
import ShowServices from '../services/show.service';

export default class ShowController {
  public async getShowFromTreaterAndMovie(theatreId : String, movieId : String) :
  Promise<ShowResponsePayload> {
    const showServices = new ShowServices();
    const showResult = showServices.getShow(theatreId, movieId);
    const payload = new ShowResponsePayload();
    payload.show = (await showResult);
    return payload;
  }

  public async getBookedSeatFromTheatreAndMovie(theatreId : String, movieId : String) :
  Promise<ShowResponsePayload> {
    const showServices = new ShowServices();
    const showResult = showServices.getBookedSeat(theatreId, movieId);
    const payload = new ShowResponsePayload();
    payload.show = (await showResult);
    return payload;
  }
}
