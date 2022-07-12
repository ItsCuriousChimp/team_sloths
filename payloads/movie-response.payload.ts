import MovieModel from '../common/models/movie.model';

export default class MovieResponsePayload {
  movieList: MovieModel[] | undefined;
}
