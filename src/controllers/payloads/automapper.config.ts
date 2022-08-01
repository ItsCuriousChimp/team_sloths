import {
  Mapper, createMap, forMember, mapFrom,
} from '@automapper/core';
import BookedSeatModel from '../../common/models/booked-seat.model';
import HeartbeatModel from '../../common/models/heartbeat.model';
import MovieModel from '../../common/models/movie.model';
import ShowModel from '../../common/models/show.model';
import TheatreModel from '../../common/models/theatre.model';
import UserModel from '../../common/models/user.model';
import AccessTokenResponsePayload from './response-payload/access-token-response.payload';
import BookedSeatResponsePayload from './response-payload/booked-seat-response.payload';
import HeartbeatResponsePayload from './response-payload/heartbeat-response.payload';
import MovieResponsePayload from './response-payload/movie-response.payload';
import TheatreResponsePayload from './response-payload/theatre-response.payload';
import UpcomingMovieShowInTheatreResponsePayload from './response-payload/upcoming-movie-show-in-theatre-response.payload.ts';
import UserResponsePayload from './response-payload/user-response.payload';

export default class AutomapperPayloadConfig {
  public static init(mapper : Mapper) {
    createMap(mapper, UserModel, UserResponsePayload);
    createMap(mapper, TheatreModel, TheatreResponsePayload);
    createMap(mapper, ShowModel, UpcomingMovieShowInTheatreResponsePayload);
    createMap(mapper, MovieModel, MovieResponsePayload);
    createMap(mapper, HeartbeatModel, HeartbeatResponsePayload);
    createMap(mapper, BookedSeatModel, BookedSeatResponsePayload);
    createMap(mapper, String, AccessTokenResponsePayload, forMember(
      (d) => d.accessToken,
      mapFrom((s) => s),
    ));
  }
}
