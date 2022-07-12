import { PrismaClient } from '@prisma/client';
import MovieModel from '../../../common/models/movie.model';

const prisma: PrismaClient = new PrismaClient();

export default class MovieRepository {
  public async getMovie(theatreId: String): Promise<MovieModel[]> {
    const theatre = await prisma.theatre.findUnique({
      where: {
        id: String(theatreId),
      },
      include: {
        screen: {
          include: {
            show: {
              include: {
                movie: true,
              },
            },
          },
        },
      },
    });
    let movies: any[] = [];
    const screens = theatre?.screen;
    if (screens) {
      for (let i = 0; i < screens.length; i += 1) {
        const { show } = screens[i];
        movies = movies.concat(show);
      }
      for (let i = 0; i < movies.length; i += 1) {
        movies[i] = movies[i].movie;
      }
    }
    const movieModelList: MovieModel[] = [];
    for (let i = 0; i < movies.length; i += 1) {
      const { id, name, language } = movies[i];
      let shouldAdd = true;
      for (let j = 0; j < movieModelList.length; j += 1) {
        if (movieModelList[j].id === id) {
          shouldAdd = false;
          break;
        }
      }
      if (shouldAdd) {
        movieModelList.push(new MovieModel(id, name, language));
      }
    }
    return movieModelList;
  }
}
