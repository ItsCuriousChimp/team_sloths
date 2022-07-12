import MovieModel from '../../../common/models/movie.model';
import MovieResponsePayload from '../../../payloads/movie-response.payload';
import MovieService from '../services/movie.service';

export default class MovieController {
  public async getMovie(cityId: String) {
    const movieservice: MovieService = new MovieService();
    const movieList: MovieModel[] = await movieservice.getMovie(cityId);
    const payload: MovieResponsePayload = new MovieResponsePayload();
    payload.movieList = movieList;
    return payload.movieList;
  }
}
