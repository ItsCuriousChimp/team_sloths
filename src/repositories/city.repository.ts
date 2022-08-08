import ArgumentValidationError from '../common/errors/argument-validation.error';
import CityModel from '../common/models/city.model';
import BaseRepository from './base.repository';

export default class CityRepository extends BaseRepository {
  public async getCityByCityId(cityId : string) :Promise<CityModel> {
    const city = await this.dsClient.city.findFirst({
      where: {
        id: cityId,
      },
    });
    const cityModel : CityModel = this.makeCityModel(city);

    return cityModel;
  }

  private makeCityModel(cityData : any) : CityModel {
    if (cityData === null) {
      throw new ArgumentValidationError('Invalid user id');
    }
    const cityModel : CityModel = new CityModel(
      cityData.id,
      cityData.name,
    );
    return cityModel;
  }
}
