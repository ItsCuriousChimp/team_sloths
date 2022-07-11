import ScreenModel from '../../../common/models/screen.model';
import ScreenRepository from '../repository/screen.repository';

export default class ScreenServices {
  public async getSeats(theatreId : String, movieId : String) : Promise<ScreenModel[]> {
    const screenRepository = new ScreenRepository();
    const screens = screenRepository.getScreens(theatreId, movieId);
    return screens;
  }
}
