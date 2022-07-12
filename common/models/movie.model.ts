import { movie } from '@prisma/client';

export default class MovieModel {
  movie: movie;

  constructor(movieResponse: movie) {
    this.movie = movieResponse;
  }
}
