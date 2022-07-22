import { PrismaClient } from '@prisma/client';
import CityModel from '../common/models/city.model';

const prisma: PrismaClient = new PrismaClient();

export default class CityRepository {
  public async getCityByCityId(cityId : String) :Promise<CityModel | null> {
    const city = await prisma.city.findFirst({
      where: {
        id: String(cityId),
      },
    });
    if (city === null) {
      return null;
    }
    const cityModel :CityModel = new CityModel(city.id, city.name);
    return cityModel;
  }
}
