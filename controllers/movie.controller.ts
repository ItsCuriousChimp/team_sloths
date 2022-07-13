import { Response, Request } from 'express';
import MovieModel from '../common/models/movie.model';
import MovieResponsePayload from './payloads/movie.payload';
import MovieService from '../services/movie.service';

export default class MovieController {
  public async getMovieByCityId(req: Request, res: Response) {
    const { cityId }: any = req.query;
    const movieservice: MovieService = new MovieService();
    const movieList: MovieModel[] = await movieservice.getMovieByCityId(cityId);
    const result: MovieResponsePayload[] = [];
    for (let i = 0; i < movieList.length; i += 1) {
      const payload: MovieResponsePayload = new MovieResponsePayload();
      payload.id = movieList[i].id;
      payload.name = movieList[i].name;
      result.push(payload);
    }
    res.json(result);
  }

  public async getMovie(req: Request, res: Response) {
    const { cityId, theatreId }: any = req.query;
    if (cityId === undefined && theatreId === undefined) {
      res.status(400).send('cityId and theatreId are required');
    } else if (cityId === undefined) {
      res.status(400).send('call to getMovieByTheatreId is not supported');
    }
    return this.getMovieByCityId(req, res);
  }
}
