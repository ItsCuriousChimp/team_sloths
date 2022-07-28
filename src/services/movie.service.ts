import MovieModel from '../common/models/movie.model';
import MovieRepository from '../repositories/movie.repository';

export default class MovieService {
  public async getMovieByCityId(cityId: string): Promise<MovieModel[]> {
    const movies = await new MovieRepository().getMoviesByCityId(cityId);
    return movies;
  }
  public async getMoviesByTheatreId(theatreId: string): Promise<MovieModel[]> {
    const movies = await new MovieRepository().getMoviesByTheatreId(theatreId);
    return movies;
  }
}
