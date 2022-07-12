import MovieModel from '../../../common/models/movie.model';
import MovieRepository from '../repository/movie.repository';

export default class MovieService {
  public async getMovie(cityId: String): Promise<MovieModel[]> {
    const movies = await new MovieRepository().getMovies(cityId);
    return movies;
  }
}
