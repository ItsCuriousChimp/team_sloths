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
    return this.createCityModel(city);
  }

  public createCityModel(city: any): CityModel {
    return new CityModel(city.id, city.name);
  }
}
