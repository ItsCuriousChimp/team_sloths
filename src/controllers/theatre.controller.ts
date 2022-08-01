import { Request, Response } from 'express';
import TheatreModel from '../common/models/theatre.model';
import TheatreResponsePayload from './payloads/theatre-response.payload';
import TheatreService from '../services/theatre.service';
import ShowModel from '../common/models/show.model';
import UpcomingMovieShowInTheatreResponsePayload from './payloads/upcoming-movie-show-in-theatre-response.payload.ts';
import mapper from '../common/mapper';

export default class TheatreController {
  public async getTheatresByCityId(req: Request, res: Response) {
    const { cityId } = req.query;
    const theatreService : TheatreService = new TheatreService();
    const theatreList: TheatreModel[] = await theatreService.getTheatresByCityId(String(cityId));
    const result: TheatreResponsePayload[] = [];
    for (let i = 0; i < theatreList.length; i += 1) {
      const payload : TheatreResponsePayload =
      mapper.map(theatreList[i], TheatreModel, TheatreResponsePayload);
      result.push(payload);
    }
    res.json(result);
  }

  public async getUpcomingMovieShowsByTheatreAndMovieId(req : Request, res: Response) {
    const theatreIdUrl : any = req.params.theatresId;
    const movieIdUrl : any = req.query.movieId;

    const theatreServiceInstance : TheatreService = new TheatreService();
    const showList: ShowModel[] =
    await theatreServiceInstance.getUpcomingMovieShowsByTheatreAndMovieId(theatreIdUrl, movieIdUrl);

    const result : UpcomingMovieShowInTheatreResponsePayload[] = [];

    for (let i = 0; i < showList.length; i += 1) {
      const payload : UpcomingMovieShowInTheatreResponsePayload =
      mapper.map(showList[i], ShowModel, UpcomingMovieShowInTheatreResponsePayload);

      result.push(payload);
    }

    res.json(result);
  }
}
