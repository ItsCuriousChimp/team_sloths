import { movie, PrismaClient } from '@prisma/client';
import MovieModel from '../common/models/movie.model';

const prisma: PrismaClient = new PrismaClient();

export default class MovieRepository {
  public async getMoviesByCityId(cityId: string): Promise<MovieModel[]> {
    const cityList: any = await prisma.city.findMany({
      where: { id: cityId },
      include: {
        theatre: {
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
        },
      },
    });
    const theatreList = cityList[0].theatre;
    const moviesList: Array<string> = [];
    if (theatreList !== undefined) {
      for (let i = 0; i < theatreList.length; i += 1) {
        for (let j = 0; j < theatreList[i].screen.length; j += 1) {
          for (let k = 0; k < theatreList[i].screen[j].show.length; k += 1) {
            moviesList.push(theatreList[i].screen[j].show[k].movie);
          }
        }
      }
    }

    const uniqueMovies: any = moviesList.filter((value: any, index: any, self: any) => (
      self.findIndex((v: any) => v.name === value.name) === index
    ));

    const movieModelList: MovieModel[] = [];
    for (let i = 0; i < uniqueMovies.length; i += 1) {
      movieModelList.push(this.createMovieModel(uniqueMovies[i]));
    }
    return movieModelList;
  }

  public async getMoviesByTheatreId(theatreId: string): Promise<MovieModel[]> {
    const theatre = await prisma.theatre.findUnique({
      where: {
        id: theatreId,
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
    const movies = new Map<string, movie>();
    const screens = theatre?.screen;
    if (screens) {
      for (let i = 0; i < screens.length; i += 1) {
        const { show } = screens[i];
        for (let j = 0; j < show.length; j += 1) {
          const currentMovie = show[j].movie;
          movies.set(currentMovie.id, currentMovie);
        }
      }
    }
    const movieModelList: MovieModel[] = [];
    movies.forEach((currentMovie) => {
      movieModelList.push(this.createMovieModel(currentMovie));
    });
    return movieModelList;
  }

  public createMovieModel(uniqueMovie: any): MovieModel {
    return new MovieModel(
      uniqueMovie.id,
      uniqueMovie.name,
      uniqueMovie.language,
    );
  }
}
