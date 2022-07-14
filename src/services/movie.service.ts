import MovieModel from '../common/models/movie.model';
import MovieRepository from '../repositories/movie.repository';

export default class MovieService {
  public async getMovies(theatreId: String): Promise<MovieModel[]> {
    const movies = await new MovieRepository().getMovies(theatreId);
    return movies;
  }
}
