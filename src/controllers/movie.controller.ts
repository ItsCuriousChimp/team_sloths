/* eslint-disable consistent-return */
import { Response, Request } from 'express';
import MovieModel from '../common/models/movie.model';
import MovieResponsePayload from './payloads/response-payload/movie-response.payload';
import MovieService from '../services/movie.service';
import IdRequestPayload from './payloads/request-payload/id-request.payload';

export default class MovieController {
  public async getMovieByCityId(req: Request, res: Response) {
    const cityIdRequestPayload : IdRequestPayload =
    new IdRequestPayload(String(req.query.cityId));

    const error = cityIdRequestPayload.validateAndExtract();
    if (error !== null) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const movieServiceInstance: MovieService = new MovieService();
    const movieList: MovieModel[] =
    await movieServiceInstance.getMovieByCityId(cityIdRequestPayload.id);
    const result: MovieResponsePayload[] = [];
    for (let i = 0; i < movieList.length; i += 1) {
      const payload: MovieResponsePayload = new MovieResponsePayload();
      payload.id = movieList[i].id;
      payload.name = movieList[i].name;
      payload.language = movieList[i].language;
      result.push(payload);
    }
    res.json(result);
  }

  public async getMoviesByTheatreId(req: Request, res: Response) {
    const theatreIdRequestPayload : IdRequestPayload =
    new IdRequestPayload(String(req.params.theatreId));

    const error = theatreIdRequestPayload.validateAndExtract();
    if (error !== null) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const movieServiceInstance: MovieService = new MovieService();
    const movieList: MovieModel[] =
    await movieServiceInstance.getMoviesByTheatreId(theatreIdRequestPayload.id);
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
