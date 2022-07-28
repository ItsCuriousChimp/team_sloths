import { Response, Request } from 'express';
import MovieModel from '../common/models/movie.model';
import MovieResponsePayload from './payloads/movie-response.payload';
import MovieService from '../services/movie.service';
import mapper from '../common/mapper';
import IdRequestPayload from './payloads/request/id-request.payload';

export default class MovieController {
  public async getMovieByCityId(req: Request, res: Response) {
    const { cityId } = req.query;
    const movieService: MovieService = new MovieService();
    const movieList: MovieModel[] = await movieService.getMovieByCityId(String(cityId));
    const result: MovieResponsePayload[] = [];
    for (let i = 0; i < movieList.length; i += 1) {
      const payload : MovieResponsePayload =
      mapper.map(movieList[i], MovieModel, MovieResponsePayload);

      result.push(payload);
    }
    res.json(result);
  }

  public async getMoviesByTheatreId(req: Request, res: Response): Promise<void> {
    const { theatreId } = req.params;
    const idRequestPayload = await new IdRequestPayload().validateAndExtract(String(theatreId));
    if (idRequestPayload) {
      res.status(400).send(idRequestPayload);
      return;
    }
    const movieService: MovieService = new MovieService();
    const movieList: MovieModel[] = await movieService.getMoviesByTheatreId(theatreId);
    const result: MovieResponsePayload[] = [];
    for (let i = 0; i < movieList.length; i += 1) {
      const payload : MovieResponsePayload =
      mapper.map(movieList[i], MovieModel, MovieResponsePayload);

      result.push(payload);
    }
    res.json(result);
  }
}
