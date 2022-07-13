import { Request, Response } from 'express';
import TheatreModel from '../common/models/theatre.model';
import TheatreResponsePayload from './payloads/theatre-response.payload';
import TheatreService from '../services/theatre.service';
import ShowModel from '../common/models/show.model';
import UpcomingMovieShowInTheatreResponsePayload from './payloads/upcomingMovieShowInTheatre-response.payload';

export default class TheatreController {
  public async getTheatre(req: Request, res: Response) {
    const { cityId } = req.query;
    const theatreService : TheatreService = new TheatreService();
    const theatreList: TheatreModel[] = await theatreService.getTheatre(String(cityId));
    const result: TheatreResponsePayload[] = [];
    for (let i = 0; i < theatreList.length; i += 1) {
      const payload: TheatreResponsePayload = new TheatreResponsePayload();
      payload.id = theatreList[i].id;
      payload.name = theatreList[i].name;
      result.push(payload);
    }
    res.json(result);
  }

  public async getUpcomingMovieShowsByTheatreAndMovieId(req : Request, res: Response) {
    const theatreIdUrl : any = req.params.theatresId;
    const movieIdUrl : any = req.query.movieId;

    const theatreService : TheatreService = new TheatreService();
    const theatreList: ShowModel[] =
    await theatreService.getUpcomingMovieShowsByTheatreAndMovieId(theatreIdUrl, movieIdUrl);
    const result : UpcomingMovieShowInTheatreResponsePayload[] = [];
    for (let i = 0; i < theatreList.length; i += 1) {
      const payload : UpcomingMovieShowInTheatreResponsePayload =
      new UpcomingMovieShowInTheatreResponsePayload();
      payload.id = theatreList[i].id;
      payload.screenId = theatreList[i].screenId;
      payload.movieId = theatreList[i].movieId;
      payload.showStartTimeInUtc = theatreList[i].showStartTimeInUtc;
      payload.showEndTimeInUtc = theatreList[i].showEndTimeInUtc;
      payload.totalSeats = theatreList[i].totalSeats;
      payload.availableSeats = theatreList[i].availableSeats;
      payload.availabilityStatus = theatreList[i].availabilityStatus;
      result.push(payload);
    }
    res.json(result);
  }
}
