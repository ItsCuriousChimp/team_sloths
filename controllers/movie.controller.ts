import { Request, Response } from 'express';
import MovieModel from '../common/models/movie.model';
import MovieResponsePayload from './payloads/movie-response.payload';
import MovieService from '../services/movie.service';

export default class MovieController {
  public async getMovies(req: Request, res: Response): Promise<void> {
    const { theatreId } = req.params;
    const movieService: MovieService = new MovieService();
    const movieList: MovieModel[] = await movieService.getMovies(theatreId);
    const result: MovieResponsePayload[] = [];
    for (let i = 0; i < movieList.length; i += 1) {
      const payload: MovieResponsePayload = new MovieResponsePayload();
      const { id, name, language } = movieList[i];
      payload.id = id;
      payload.name = name;
      payload.language = language;
      result.push(payload);
    }
    res.json(result);
  }
}
