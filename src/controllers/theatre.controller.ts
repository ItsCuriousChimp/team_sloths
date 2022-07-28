import { Request, Response } from 'express';
import TheatreModel from '../common/models/theatre.model';
import TheatreResponsePayload from './payloads/theatre-response.payload';
import TheatreService from '../services/theatre.service';
import ShowModel from '../common/models/show.model';
import UpcomingMovieShowInTheatreResponsePayload from './payloads/upcoming-movie-show-in-theatre-response.payload.ts';

export default class TheatreController {
  public async getTheatresByCityId(req: Request, res: Response) {
    const { cityId } = req.body;

    const theatreService : TheatreService = new TheatreService();
    const theatreList: TheatreModel[] = await theatreService.getTheatresByCityId(String(cityId));
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
    const theatreIdUrl: any = req.body.theatresId;
    const movieIdUrl: any = req.body.movieId;

    const theatreServiceInstance : TheatreService = new TheatreService();
    const showList: ShowModel[] =
    await theatreServiceInstance.getUpcomingMovieShowsByTheatreAndMovieId(theatreIdUrl, movieIdUrl);

    const result : UpcomingMovieShowInTheatreResponsePayload[] = [];

    for (let i = 0; i < showList.length; i += 1) {
      const payload : UpcomingMovieShowInTheatreResponsePayload =
      new UpcomingMovieShowInTheatreResponsePayload();
      payload.id = showList[i].id;
      payload.screenId = showList[i].screenId;
      payload.movieId = showList[i].movieId;
      payload.showStartTimeInUtc = showList[i].showStartTimeInUtc;
      payload.showEndTimeInUtc = showList[i].showEndTimeInUtc;
      payload.availableUntilUtc = showList[i].availableUntilUtc;
      payload.totalSeats = showList[i].totalSeats;
      payload.availableSeats = showList[i].availableSeats;
      payload.availabilityStatus = showList[i].availabilityStatus;
      result.push(payload);
    }

    res.json(result);
  }
}
