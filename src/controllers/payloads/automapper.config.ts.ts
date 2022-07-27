import {
  Mapper, createMap, forMember, mapFrom,
} from '@automapper/core';
import BookedSeatModel from '../../common/models/booked-seat.model';
import HeartbeatModel from '../../common/models/heartbeat.model';
import MovieModel from '../../common/models/movie.model';
import ShowModel from '../../common/models/show.model';
import TheatreModel from '../../common/models/theatre.model';
import UserModel from '../../common/models/user.model';
import AccessTokenResponsePayload from './access-token-response.payload';
import BookedSeatResponsePayload from './booked-seat-response.payload';
import HeartbeatResponsePayload from './heartbeat-response.payload';
import MovieResponsePayload from './movie-response.payload';
import TheatreResponsePayload from './theatre-response.payload';
import UpcomingMovieShowInTheatreResponsePayload from './upcoming-movie-show-in-theatre-response.payload.ts';
import UserResponsePayload from './user-response.payload';

export default class AutomapperPayloadConfig {
  public init(mapper: Mapper) {
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
