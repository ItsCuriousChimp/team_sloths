/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import TheatreModel from '../common/models/theatre.model';
import TheatreResponsePayload from './payloads/response-payload/theatre-response.payload';
import TheatreService from '../services/theatre.service';
import ShowModel from '../common/models/show.model';
import UpcomingMovieShowInTheatreResponsePayload from './payloads/response-payload/upcoming-movie-show-in-theatre-response.payload.ts';
import IdRequestPayload from './payloads/request-payload/id-request.payload';

export default class TheatreController {
  public async getTheatresByCityId(req: Request, res: Response) {
    const cityIdRequestPayload : IdRequestPayload =
    new IdRequestPayload(String(req.query.cityId));

    try {
      await cityIdRequestPayload.validate().validateAsync({ id: String(req.query.cityId) });
    } catch (err : any) {
      return res.status(400).send({ error: err.details[0].message });
    }

    const theatreService : TheatreService = new TheatreService();
    const theatreList: TheatreModel[] =
    await theatreService.getTheatresByCityId(cityIdRequestPayload.id);
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
    const theatreIdRequestPayload : IdRequestPayload =
    new IdRequestPayload(String(req.params.theatreId));

    try {
      await theatreIdRequestPayload.validate().validateAsync({ id: String(req.params.theatreId) });
    } catch (err : any) {
      return res.status(400).send({ error: err.details[0].message });
    }
    const movieIdRequestPayload : IdRequestPayload =
    new IdRequestPayload(String(req.query.movieId));

    try {
      await movieIdRequestPayload.validate().validateAsync({ id: String(req.query.movieId) });
    } catch (err : any) {
      return res.status(400).send({ error: err.details[0].message });
    }

    const theatreServiceInstance : TheatreService = new TheatreService();
    const showList: ShowModel[] =
    await theatreServiceInstance.getUpcomingMovieShowsByTheatreAndMovieId(
      theatreIdRequestPayload.id,
      movieIdRequestPayload.id,
    );

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
