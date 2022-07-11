import { Request, Response } from 'express';
import TheatreModel from '../../../common/models/theatre.model';
import TheatreResponsePayload from '../../../payloads/theatre-response.payload';
import TheatreService from '../services/theatre.service';

export default class TheatreController {
  public async getTheatre(req: Request, res: Response) {
    const { cityId } = req.query;
    const theatreservice : TheatreService = new TheatreService();
    const theatreList: TheatreModel[] = await theatreservice.getTheatre(String(cityId));
    const payload: TheatreResponsePayload = new TheatreResponsePayload();
    payload.theatreList = theatreList;
    res.json(payload.theatreList);
  }
}
