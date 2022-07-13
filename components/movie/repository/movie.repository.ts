import { PrismaClient, movie } from '@prisma/client';
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
    const movies = new Map<String, movie>();
    const screens = theatre?.screen;
    if (screens) {
      for (let i = 0; i < screens.length; i += 1) {
        const { show } = screens[i];
        for (let j = 0; j < show.length; j += 1) {
          const movie = show[j].movie;
          movies.set(movie.id, movie)
        }
      }
    }

    const movieModelList: MovieModel[] = [];
    movies.forEach((movie) => {
      const { id, name, language } = movie;
      movieModelList.push(new MovieModel(id, name, language));
    })

     return movieModelList;
  }
}
