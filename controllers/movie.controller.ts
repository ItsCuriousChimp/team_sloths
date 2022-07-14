import { Response, Request } from 'express';
import MovieModel from '../common/models/movie.model';
import MovieResponsePayload from './payloads/movie-response.payload';
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
  public async getMoviesByTheatreId(req: Request, res: Response) {
    const theatreId : any = req.params.theatresId;
    const movieservice: MovieService = new MovieService();
    const movieList: MovieModel[] = await movieservice.getMoviesByTheatreId(theatreId);
    const result: MovieResponsePayload[] = [];
    for (let i = 0; i < movieList.length; i += 1) {
      const payload: MovieResponsePayload = new MovieResponsePayload();
      payload.id = movieList[i].id;
      payload.name = movieList[i].name;
      result.push(payload);
    }
    res.json(result);
  }
}
