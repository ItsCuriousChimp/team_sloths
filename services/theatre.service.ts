import TheatreModel from '../common/models/theatre.model';
import TheatreRepository from '../repositories/theatre.repository';

export default class TheatreService {
  public async getTheatres(cityId: String): Promise<TheatreModel[]> {
    const theatres = await new TheatreRepository().getTheatres(cityId);
    return theatres;
  }
}
