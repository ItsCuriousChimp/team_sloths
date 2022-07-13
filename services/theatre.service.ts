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
    const theatreRepository = new TheatreRepository();
    const screenRepository = new ScreenRepository();

    let shows = await theatreRepository.getShowByTheatreIdAndMovieId(theatreId, movieId);
    const seatsInScreensForTheatreAndMovie =
    await screenRepository.getScreensWithItsSeatsByTheatreIdAndMovieId(theatreId, movieId);
    const bookedSeats =
    await theatreRepository.getShowsAndBookedSeatByTheatreIdAndMovieId(theatreId, movieId);

    shows = seatStatusForShow(shows, seatsInScreensForTheatreAndMovie, bookedSeats);
    // console.log(shows);
    return shows;
  }
}
