import ShowModel from '../../../common/models/show.model';
import ShowRepository from '../repository/show.repository';

export default class ShowServices {
  public async getShow(theatreId : String, movieId : String) : Promise<ShowModel[]> {
    const showRepository = new ShowRepository();
    const shows = showRepository.getShow(theatreId, movieId);
    return shows;
  }

  public async getBookedSeat(theatreId : String, movieId : String) : Promise<ShowModel[]> {
    const showRepository = new ShowRepository();
    const shows = showRepository.getBookedSeat(theatreId, movieId);
    return shows;
  }
}
