import CityModel from '../common/models/city.model';
import BaseRepository from './base.repository';

export default class CityRepository extends BaseRepository {
  public async getCityByCityId(cityId : string) :Promise<CityModel | null> {
    const city = await this.dsClient.city.findFirst({
      where: {
        id: cityId,
      },
    });
    if (city === null) {
      return null;
    }
    const cityModel : CityModel = this.makeCityModel(city);

    return cityModel;
  }

  private makeCityModel(cityData : any) : CityModel {
    const cityModel : CityModel = new CityModel(
      cityData.id,
      cityData.name,
    );
    return cityModel;
  }
}
