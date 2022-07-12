import ScreenModel from '../../../common/models/screen.model';
import ScreenResponsePayload from '../../../payloads/screen-response.payload';
import ScreenServices from '../services/screen.service';

export default class ScreenController {
  public async getSeatFromTreaterAndMovie(theatreId : String, movieId : String) :
  Promise<ScreenResponsePayload[]> {
    const screenServices = new ScreenServices();
    const screenList : ScreenModel[] = await screenServices.getSeats(theatreId, movieId);
    const payload : ScreenResponsePayload[] = [];
    screenList.forEach((screen) => {
      const element : ScreenResponsePayload = new ScreenResponsePayload();
      element.id = screen.id;
      element.theatreId = screen.theatreId;
      element.screenNumber = screen.screenNumber;
      element.show = screen.show;
      element.seat = screen.seat;
      payload.push(element);
    });
    return payload;
  }
}
