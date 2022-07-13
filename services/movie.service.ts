import MovieModel from '../common/models/movie.model';
import MovieRepository from '../repository/movie.repository';

export default class MovieService {
  public async getMovieByCityId(cityId: String): Promise<MovieModel[]> {
    const movies = await new MovieRepository().getMoviesByCityId(cityId);
    return movies;
  }
}
