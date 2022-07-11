import TheatreModel from '../../../common/models/theatre.model';
import TheatreResponsePayload from '../../../payloads/theatre-response.payload';
import TheatreService from '../services/theatre.service';

export default class TheatreController {
  public async getTheatre(cityId: String): Promise<TheatreResponsePayload> {
    const theatreservice : TheatreService = new TheatreService();
    const theatreList: TheatreModel[] = await theatreservice.getTheatre(cityId);
    const payload: TheatreResponsePayload = new TheatreResponsePayload();
    payload.theatreList = theatreList;
    return payload;
  }
}
