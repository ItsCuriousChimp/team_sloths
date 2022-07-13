import ShowModel from '../common/models/show.model';
import TheatreModel from '../common/models/theatre.model';
import TheatreRepository from '../repository/theatre.repository';
import ScreenRepository from '../repository/screen.repository';
import seatStatusForShow from '../computation/showsSeatStatus';

export default class TheatreService {
  public async getTheatre(cityId: String): Promise<TheatreModel[]> {
    const theatres = await new TheatreRepository().getTheatres(cityId);
    return theatres;
  }

  public async getUpcomingMovieShowsByTheatreAndMovieId(
    theatreId : String,
    movieId : String,
  ) : Promise<ShowModel[]> {
    const theatreRepositoryInstance = new TheatreRepository();
    const screenRepositoryInstance = new ScreenRepository();

    let shows =
    await theatreRepositoryInstance.getShowByTheatreIdAndMovieId(theatreId, movieId);

    const seatsInScreensForTheatreAndMovie =
    await screenRepositoryInstance.getScreensWithItsSeatsByTheatreIdAndMovieId(theatreId, movieId);

    const bookedSeats =
    await theatreRepositoryInstance.getShowsAndBookedSeatByTheatreIdAndMovieId(theatreId, movieId);

    shows = seatStatusForShow(shows, seatsInScreensForTheatreAndMovie, bookedSeats);

    return shows;
  }
}
