import TheatreModel from '../../../common/models/theatre.model';
import TheatreRepository from '../repository/theatres.repository';

export default class TheatreService {
  public async getTheatre(cityId: String): Promise<TheatreModel[]> {
    const theatres = await new TheatreRepository().getTheatres(cityId);
    return theatres;
  }
}
