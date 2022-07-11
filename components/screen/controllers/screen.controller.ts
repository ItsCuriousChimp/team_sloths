import ScreenResponsePayload from '../../../payloads/screen-response.payload';
import ScreenServices from '../services/screen.service';

export default class ScreenController {
  public async getSeatFromTreaterAndMovie(theatreId : String, movieId : String) :
  Promise<ScreenResponsePayload> {
    const screenServices = new ScreenServices();
    const screenResult = screenServices.getSeats(theatreId, movieId);
    const payload = new ScreenResponsePayload();
    payload.screen = (await screenResult);
    return payload;
  }
}
