import ShowModel from '../common/models/show.model';
import TheatreModel from '../common/models/theatre.model';
import TheatreRepository from '../repository/theatre.repository';
import ScreenRepository from '../repository/screen.repository';

export default class TheatreService {
  public async getTheatresByCityId(cityId: String): Promise<TheatreModel[]> {
    const theatres = await new TheatreRepository().getTheatresByCityId(cityId);
    return theatres;
  }

  public async getUpcomingMovieShowsByTheatreAndMovieId(
    theatreId : String,
    movieId : String,
  ) : Promise<ShowModel[]> {
    const theatreRepositoryInstance = new TheatreRepository();
    const screenRepositoryInstance = new ScreenRepository();

    const seatsInScreensForTheatreAndMovie =
    await screenRepositoryInstance.getScreensWithItsSeatsByTheatreIdAndMovieId(theatreId, movieId);

    const showsWithBookedSeats =
    await theatreRepositoryInstance.getShowsAndBookedSeatByTheatreIdAndMovieId(theatreId, movieId);

    /* ******************** Set seat status property ******************** */

    const totalSeatsMap = new Map<String, Number>();
    //  Fill values in total Seats Map
    seatsInScreensForTheatreAndMovie.forEach((eachScreen : any) => {
      if (!totalSeatsMap.has(eachScreen.screenId)) {
        totalSeatsMap.set(eachScreen.id, eachScreen.seat.length);
      }
    });

    // Map for booked seats according to each show
    const bookedSeatsMap = new Map<String, Number>();
    // Fill values in the bookedSeatsMap
    showsWithBookedSeats.forEach((eachShow : any) => {
      if (!bookedSeatsMap.has(eachShow.id)) {
        bookedSeatsMap.set(
          eachShow.id,
          eachShow.bookedSeat.length,
        );
      }
    });

    // Set status property in shows according to vacant seats
    for (let i : number = 0; i < showsWithBookedSeats.length; i += 1) {
      const totalNumberOfSeatsInScreen : any = totalSeatsMap.get(showsWithBookedSeats[i].screenId);
      const totalNumberOfBookedSeatsForMovie :any = bookedSeatsMap.get(showsWithBookedSeats[i].id);
      const emptySeats : number = totalNumberOfSeatsInScreen - totalNumberOfBookedSeatsForMovie;
      showsWithBookedSeats[i].totalSeats = totalNumberOfSeatsInScreen;
      showsWithBookedSeats[i].availableSeats = emptySeats;
      if (emptySeats === 0) {
        showsWithBookedSeats[i].availabilityStatus = 'Not Available';
      } else if (emptySeats <= 10) {
        showsWithBookedSeats[i].availabilityStatus = 'Filling Fast';
      } else {
        showsWithBookedSeats[i].availabilityStatus = 'Available';
      }
    }

    return showsWithBookedSeats;
  }
}
