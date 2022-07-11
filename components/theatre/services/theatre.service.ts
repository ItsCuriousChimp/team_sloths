import TheatreModel from '../../../common/models/theatre.model';
import TheatreRepository from '../repository/theatres.repository';

export default class TheatreService {
  public getTheatre(cityId: String): Promise<TheatreModel> {
    return new TheatreRepository().getTheatres(cityId);
  }
}
