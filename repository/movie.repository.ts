/* eslint-disable max-len */
import { PrismaClient } from '@prisma/client';
import MovieModel from '../common/models/movie.model';

const prisma: PrismaClient = new PrismaClient();

export default class MovieRepository {
  public async getMoviesByCityId(cityId: String): Promise<MovieModel[]> {
    const cityList: any = await prisma.city.findMany({
      where: { id: String(cityId) },
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
      movieModelList.push(new MovieModel(uniqueMovies[i].id, uniqueMovies[i].name));
    }
    return movieModelList;
  }
  public async getMoviesByTheatreId(theatreId: String): Promise<MovieModel[]> {
    const theatresList: any = await prisma.theatre.findMany({
      where: { id: String(theatreId) },
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
    const screenList = theatresList[0].screen;
    const moviesList: Array<string> = [];
    if (screenList !== undefined) {
      for (let i = 0; i < screenList.length; i += 1) {
        for (let j = 0; j < screenList[i].show.length; j += 1) {
          moviesList.push(screenList[i].show[j].movie);
        }
      }
    }

    const uniqueMovies: any = moviesList.filter((value: any, index: any, self: any) => (
      self.findIndex((v: any) => v.name === value.name) === index
    ));

    const movieModelList: MovieModel[] = [];
    for (let i = 0; i < uniqueMovies.length; i += 1) {
      movieModelList.push(new MovieModel(uniqueMovies[i].id, uniqueMovies[i].name));
    }
    return movieModelList;
  }
}
