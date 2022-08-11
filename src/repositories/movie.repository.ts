import MovieModel from '../common/models/movie.model';
import BaseRepository from './base.repository';

export default class MovieRepository extends BaseRepository {
  public async getMoviesByCityId(cityId: string): Promise<MovieModel[]> {
    const cityList: any = await this.dsClient.city.findMany({
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
      movieModelList.push(this.makeMovieModel(uniqueMovies[i]));
    }
    return movieModelList;
  }

  public async getMoviesByTheatreId(theatreId: string): Promise<MovieModel[]> {
    const theatre = await this.dsClient.theatre.findUnique({
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
    const movies = new Map<string, any>();
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
      movieModelList.push(this.makeMovieModel(currentMovie));
    });
    return movieModelList;
  }

  private makeMovieModel(movieData : any) : MovieModel {
    const movieModel : MovieModel = new MovieModel(
      movieData.id,
      movieData.name,
      movieData.language,
    );
    return movieModel;
  }
}
