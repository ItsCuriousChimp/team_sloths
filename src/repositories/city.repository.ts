import { PrismaClient } from '@prisma/client';
import CityModel from '../common/models/city.model';

const prisma: PrismaClient = new PrismaClient();

export default class CityRepository {
  public async getCityByCityId(cityId : string) :Promise<CityModel | null> {
    const city = await prisma.city.findFirst({
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
