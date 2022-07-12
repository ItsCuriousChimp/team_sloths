/* eslint-disable max-len */
import { PrismaClient } from '@prisma/client';
import MovieModel from '../../../common/models/movie.model';

const prisma: PrismaClient = new PrismaClient();

export default class MovieRepository {
  public async getMovies(cityId: String): Promise<MovieModel[]> {
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
            moviesList.push(theatreList[i].screen[j].show[k].movie.name);
          }
        }
      }
    }
    const uniqueMovies: any = moviesList.filter((item, index) => moviesList.indexOf(item) === index);
    const movieModelList: MovieModel[] = [];
    for (let i = 0; i < uniqueMovies.length; i += 1) {
      movieModelList.push(new MovieModel(uniqueMovies[i]));
    }
    return movieModelList;
  }
}
